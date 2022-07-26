var cookieParser = require('cookie-parser');
app.use(cookieParser());

var express = require('express');
var app = express();
app.use(express.json())

app.get('/', function (req, res) {
  res.cookie('name', 'express').send('cookie set'); //sets name = express
}); 

//Expires after 360000 ms from the time it is set.
res.cookie(name, 'value', { expire: 360000 + Date.now() });

//This cookie also expires after 360000 ms from the time it is set.
res.cookie(name, 'value', { maxAge: 360000 });

app.get('/clear_cookie_foo', function(req, res){
  res.clearCookie('foo');
  res.send('cookie foo cleared');
});


app.listen(3000);