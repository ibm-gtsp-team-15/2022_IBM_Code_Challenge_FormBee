const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const formsRoute = require("./routes/forms");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/forms", formsRoute);

app.listen(3000);
