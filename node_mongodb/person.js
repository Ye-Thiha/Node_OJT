const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const pug = require('pug');
var app = express();
var urlencodedParser = bodyparser.urlencoded({ extended: true});

//app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.set('view engine', 'pug');

//mongoose.connect('mongodb+srv://Thiha:693675232@cluster0.sg54i9d.mongodb.net/my_db', {
//   useNewUrlParser: true
//},
//   err => {
//       if (!err) {
//           console.log('Connection succeeded');
//       } else {
//           console.log('Error in connection' + err);
//       }
//   });
mongoose.connect('mongodb://0.0.0.0:27017/my_db', {
   useNewUrlParser: true
},
   err => {
       if (!err) {
           console.log('Connection succeeded');
       } else {
           console.log('Error in connection' + err);
       }
   });
var personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String
});

var Person = mongoose.model("Person", personSchema);
app.get('/', function (req, res) {
   res.sendFile(__dirname+"/person.html");
});

app.post('/person', urlencodedParser, function (req, res) {
   console.log("some text");
   var personInfo =
    {
       name:req.body.name,
       age: req.body.age,
       nationality:req.body.nationality
   };
   
   if (!personInfo ){
       res.render('show_message', {
           message: "Sorry, you provided worng info", type: "error"
       });
   } else {
       var newPerson = new Person({
           name: personInfo.name,
           age: personInfo.age,
           nationality: personInfo.nationality
       });
      newPerson.save(function (err, Person) {
           if (err)
               res.render('show_message', { message: "Database error", type: "error" });
           else
               res.render('show_message', {
                   message: "New person added", type: "success", person: personInfo

               });
       });
   }
   var jsonString=JSON.parse(JSON.stringify(personInfo));
   console.log(jsonString);
});

app.listen(3000, () => {
   console.log('Server started at port 3000');
});