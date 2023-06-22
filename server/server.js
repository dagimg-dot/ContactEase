require("dotenv").config();

const express = require("express");
const body_parser = require("body-parser");
const morgan = require("morgan");
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(body_parser.json({ limit: "100mb" }));

app.post("/say_hi", require("./express/say-hi"));

const port = process.env.EXPRESS_PORT;

app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});
