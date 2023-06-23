const fetch = require("node-fetch");

const HASURA_OPERATION = `
query ($email: String!, $password: String!) {
  user(where: {email: {_eq: $email}, password: {_eq: $password}}) {
    user_id
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
        accessToken: "",
      });
    }

    return res.json({
      success: true,
      accessToken: data.user[0].user_id,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = login;
