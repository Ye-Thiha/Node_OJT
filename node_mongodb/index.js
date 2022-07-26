const express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Thiha:693675232@cluster0.sg54i9d.mongodb.net/test?ret ryWrites=true&w=majority');
//const mongoose = require('mongoose');
var app=express();

app.get('/person', function(req, res){
  res.render('person');
});