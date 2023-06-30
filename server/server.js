const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/signup", require("./express/signup"));
app.post("/login", require("./express/login"));
// app.post("/say_hi", require("./express/say-hi"));

app.listen(PORT);

const port = process.env.EXPRESS_PORT;

app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});
