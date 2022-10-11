// server.js
const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
// Define Express App
const app = express();
const PORT = process.env.PORT || 8080;
// Serve Static Assets
//app.use(express.static('public'));
app.use(bodyParser.json());

//for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

//for parsing multipart/ form-data
app.use(upload.array());
app.use(express.static('public'));

app.post('/', function (req, res) {
  console.log(req.body);
  res.send("recieved your request!");
});
app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});

//for parsing application/json
