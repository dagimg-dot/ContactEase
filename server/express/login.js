const fetch = require("node-fetch");
// const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const HASURA_OPERATION = `
query ($email: String!, $password: String!) {
  user(where: {email: {_eq: $email}, password: {_eq: $password}}) {
    user_id
    username
  }
}`;

const execute = async (variables, reqHeaders) => {
  const fetchResponse = await fetch(
    "http://host.docker.internal:2000/v1/graphql",
    {
      method: "POST",
      headers: reqHeaders || {},
      body: JSON.stringify({
        query: HASURA_OPERATION,
        variables,
      }),
    }
  );

  if (!fetchResponse.ok) {
    throw new Error("Failed to fetch data from the Hasura server.");
  }

  return await fetchResponse.json();
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // make the req headers handle the hasura role anonymously
    const headers = {
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    };

    // let hashedPassword = await bcrypt.hash(password, 10); // this is for hashing the password and 10 is the salt rounds

    const { data, errors } = await execute({ email, password }, headers);

    if (errors) {
      return res.status(400).json({
        message: errors[0].message,
      });
    }

    // return true with the user id if the user exists else return false
    if (data.user.length === 0) {
      return res.json({
        success: false,
        user_id: "",
        username: "",
        accessToken: "",
      });
    }

    // generate JWT token
    const tokenContents = {
      sub: data.user[0].user_id.toString(), // user id from the users table
      iat: Date.now() / 1000,
      iss: "https://localhost:3000",
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-user-id": data.user[0].user_id.toString(), // user id from the users table
        "x-hasura-default-role": "user",
        "x-hasura-role": "user",
      },
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    };

    const token = jwt.sign(tokenContents, "my_secret_key"); 

    return res.json({
      success: true,
      user_id: data.user[0].user_id.toString(),
      username: data.user[0].username,
      accessToken: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = login;
