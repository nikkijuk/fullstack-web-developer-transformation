var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(cookieParser('12345-67890-09876-54321')); // secret key

function auth (req, res, next) {

    if (!req.signedCookies.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log(`User not authenticated: should result error`);
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            res.cookie('user','admin',{signed: true});
            console.log(`Used authorized : ok`);
            next(); // authorized
        } else {
            console.log(`Used authorization: failure`);
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
    else {
        if (req.signedCookies.user === 'admin') {
            console.log(`Already authenticated as "admin"`);
            next();
        }
        else {
            console.log(`Not authenticated as "admin"`);
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
};

app.use(auth);

app.use(express.static(__dirname + '/public'));

app.use(function(err,req,res,next) {

            res.writeHead(err.status || 500, {
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
       console.log(`Used basic authentication`);
            
        res.end(err.message);
});

app.listen(port, hostname, function(){
  console.log(`session : Server running at http://${hostname}:${port}/`);
});