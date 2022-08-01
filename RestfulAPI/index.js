var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/movie_db');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.get('/', (req, res) => {
  res.send('Hello Kitty');
});


//Require the Router we defined in movies.js
var movies = require('./movies.js');
const { connect } = require('./movies.js');
//const { default: mongoose } = require('mongoose');

//Use the Router on the sub route /movies
app.use('/movies', movies);

app.listen(3000);