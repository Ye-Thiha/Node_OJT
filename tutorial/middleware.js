var express = require('express');
var app = express();

////Simple request time logger
//app.use(function(req, res, next){
//   console.log("A new request received at " + Date.now());
//   
//   //This function call is very important. It tells that more processing is
//   //required for the current request and is in the next middleware
//   function route handler.
//   next();
//});

//Middleware function to log request protocol
app.use('/things', function(req, res, next){
   console.log("A request for things received at " + Date.now());
   next();
});

// Route handler that sends the response
app.get('/things', function(req, res){
   res.send('Things');
});

//First middleware before response is sent
app.use(function(req, res, next){
   console.log("Start");
   next();
});

//Route handler
app.get('/', function(req, res, next){
   res.send("Middle");
   next();
});

app.use('/', function(req, res){
   console.log('End');
});

var bodyParser = require('body-parser');

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())

app.listen(3000);