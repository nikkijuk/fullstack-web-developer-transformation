/*

Register under

/favorites

Operations

/ 
GET, POST and DELETE

/:id
DELETE

Example usage

POST http://localhost:3443/favorites/

{"_id":"dish ObjectId"}

*/


var express = require('express');
var bodyParser = require('body-parser');

// get schema

var mongoose = require('mongoose');
var Favorites = require('../models/favorites');

// init router

var router = express.Router();
router.use(bodyParser.json());

// verify logic
var Verify = require('./verify');

// add routes without id

router.route('/')

// all routes are now verified
.all (Verify.verifyOrdinaryUser, function (req, res, next) {
	next ();
})

.get(function (req, res, next) {

	// http://mongoosejs.com/docs/populate.html
	// "In mongoose >= 3.6, we can pass a space delimited string of path names to populate. 
	// Before 3.6 you must execute the populate() method multiple times."
		
	// use exec to carch result instead of defining callback to find
    Favorites.find({'postedBy':req.decoded._doc._id})
    	.populate('postedBy dishes')
    	.exec(function (err, favorites) {
    		if (err) throw err;
    		res.json(favorites);
    	});
    
})

.post(function (req, res, next) {
	
    Favorites.find ({'postedBy':req.decoded._doc._id}, function (err, favorites) {
        if (err) throw err;

        // not found, add
        //if (favorites.dishes.indexof (req.body._id) === -1) {
        //if (!favorites.dishes.includes(req.body._id)) {
        if (favorites.dishes && favorites.dishes.indexof (req.body._id) === -1) {
            favorites.dishes.push(req.body._id);        	

            // save only when changed 
            favorites.save(function (err, favorites) {
                if (err) throw err;
                console.log(req.decoded._doc._id+' : Updated favorite dishes, added '+req.body._id);
                return res.json(favorites);
            });

        }
        
    });

    var f = new Favorites ();
    // save id
    f.postedBy = req.decoded._doc._id;
    f.dishes.push (req.body._id);
    
    Favorites.create(f, function (err, favorites) {
        if (err) throw err;
        console.log ('created favorites for '+favorites.postedBy);
        return res.json(favorites);
    });
        
})

.delete(function (req, res, next) {
    Favorites.remove({'postedBy':req.decoded._doc._id}, function (err, favorites) {
        if (err) throw err;
        res.json(favorites);
    });
});

//add routes with id

router.route('/:id')

// all routes are now verified
.all (Verify.verifyOrdinaryUser, function (req, res, next) {
	next ();
})

.delete(function (req, res, next) {
    
	Favorites.find ({'postedBy':req.decoded._doc._id}, function (err, favorites) {
    	
    	// check if favorites contains dish
        if (favorites.dishes.contains(req.params.id)) {
        	
        	// remove from dishes
	        favorites.dishes.id(req.params.id).remove();
	        
	        favorites.save(function (err, resp) {
	            if (err) throw err;
	            res.json(resp);
	        });
        }
    });
    
});

// export router

module.exports = router;
