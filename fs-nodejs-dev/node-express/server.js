// -- setup

var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

// -- routes

var dishRouter = require('./dishRouter').createRouter ();
var promoRouter = require('./promoRouter').createRouter ();
var leaderRouter = require('./leaderRouter').createRouter ();

app.use ('/dishes', dishRouter);
app.use ('/promotions', promoRouter);
app.use ('/leaders', leaderRouter);

// -- start

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});