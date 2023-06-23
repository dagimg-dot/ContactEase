const fetch = require("node-fetch");

const HASURA_OPERATION = `
  mutation ($username: String!, $email: String!, $password: String!) {
    insert_user_one(object: {
      username: $username,
      email: $email,
      password: $password,
    }) {
      user_id
    }
  }
`;

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

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body.input;

    // make the req headers handle the hasura role anonymously
    const headers = {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": "secret",
    };
    const { data, errors } = await execute(
      { username, email, password },
      headers
    );

    if (errors) {
      return res.status(400).json({
        message: errors[0].message,
      });
    }

    return res.json({
      ...data.insert_user_one,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = signup;
