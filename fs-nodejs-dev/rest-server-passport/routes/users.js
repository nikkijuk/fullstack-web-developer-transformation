var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

//get schema

var mongoose = require('mongoose');
var Users = require('../models/user');

/* GET users listing. */
router.route ('/')

// root is now verified with normal user checks

.all (Verify.verifyOrdinaryUser, function (req, res, next) {
	next ();
})

// users list needs to be protected

.get(Verify.verifyAdmin, function(req, res, next) {
	
	// ask all users from mongo using mongoose 
	Users.find({}, function (err, found) {
	    if (err) throw err;
	    res.json(found);
	});
  
})

// Register must work without user checks

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
      req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        
        if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
        
        // added admin logic
        if (req.body.admin) {
        	user.admin = true;
        }

        // save user 
        user.save(function(err,user) {
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
        
//        passport.authenticate('local')(req, res, function () {
//        	
//            // no need for mongo REPL - update user here if user has admin rights
//        	// dunno if this works without problems -- but I'll try
//        	
//        	// for curiously minded docs here
//        	// http://mongoosejs.com/docs/2.7.x/docs/updating-documents.html
//        	
//        	// and this is command line variation
//        	// mongo
//        	// > use conFusion
//        	// > db.users.find().pretty();
//        	// > db.users.update ({username: "admin"},{$set:{admin:true}});
//
//            if (req.body.admin) {
//            	
//            	// using update didn't work - maybe transactional problem?
////            	Users.update (
////            			{username: req.body.username},
////            			{$set:{admin:true}}
////            	);
//            	
//            	// inside find one callback worked
//            	Users.findOne({ username: req.body.username}, function (err, doc){
//            		  doc.admin = true
//            		  doc.save();
//            		});
//            	
//            	console.log ("admin flag saved for "+req.body.username);
//            }
//        	
//            return res.status(200).json({status: 'Registration Successful!'});
//        });
    });
});

// Login must work without user checks

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

// Logout should work always -- in principle it could result error when user in not logged in, but..

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

// stat authentication using facebook

router.get('/facebook', passport.authenticate('facebook'), function(req, res){});

// address to get callback info from facebook

router.get('/facebook/callback', function(req,res,next){
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

module.exports = router;