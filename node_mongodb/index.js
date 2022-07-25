var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');
//const mongoose = require('mongoose');
var app=express();

app.get('/person', function(req, res){
  res.render('person');
});