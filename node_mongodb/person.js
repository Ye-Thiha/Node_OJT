const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

var personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String
});

var Person = mongoose.model("Person", personSchema);

app.post('/person', function(req, res){
   var personInfo = req.body; //Get the parsed information
   console.log('personInfo', personInfo);  
  if(!personInfo.name || !personInfo.age || !personInfo.nationality){
     res.json({message: "Sorry, you provided worng info", type: "error"});
  } else {
     var newPerson = new Person({
        name: personInfo.name,
        age: personInfo.age,
        nationality: personInfo.nationality
     });
   
     newPerson.save(function(err, Person){
        if(err)
           res.json({message: "Database error", type: "error"});
        else
           res.json({message: "New person added", type: "success", person: personInfo});
     });
  }
});

app.listen(3000, () => {
   console.log('Server started at port 3000');
});