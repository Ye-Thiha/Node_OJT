const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

app.use(
  fileUpload()
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});