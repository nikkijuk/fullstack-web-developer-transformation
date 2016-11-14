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
		
	// use exec to catch result instead of defining callback to find
	// use findOne to get exactly one result instead of array
    Favorites.findOne({'postedBy':req.decoded._doc._id})
        .populate('postedBy dishes')
    	//.populate('postedBy')
    	//.populate('dishes')
    	.exec(function (err, favorites) {
    		if (err) throw err;
    		res.json(favorites);
    	});
    
})

.post(function (req, res, next) {
	
    Favorites.findOne({'postedBy':req.decoded._doc._id}, function (err, favorites) {
        if (err) throw err;
        
        // favorites & favorites.dishes are non null, i.e. they exist in returned object
        if (favorites && favorites.dishes) {
        	
        	// dish with given id doesn't exist in dishes list
        	if (favorites.dishes.indexOf (req.body._id) === -1) {
            	// push dish
        		favorites.dishes.push(req.body._id);       
        		console.log(req.decoded._doc._id+' : exists, add favorite '+req.body._id);
        	}
        } else {
        	// no fitting object structure, create new and replace reference to parameter favorite
        	favorites = new Favorites ();
    		favorites.dishes.push(req.body._id);       
    		console.log(req.decoded._doc._id+' : empty, add favorite '+req.body._id);
        }
        	
    	// set user as first time this is empty
        favorites.postedBy = req.decoded._doc._id;
        
        // save always 
        favorites.save(function (err, favorites) {
            if (err) throw err;
            console.log(req.decoded._doc._id+' : Updated favorite dishes, added '+req.body._id);
            return res.json(favorites);
        });
        
    });
        
})

.delete(function (req, res, next) {
	
	// wipe all off
    Favorites.remove({'postedBy':req.decoded._doc._id}, function (err, favorites) {
        if (err) throw err;
        res.json(favorites);
    });
});

//add routes with id

router.route('/:id')

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    
	Favorites.findOne ({'postedBy':req.decoded._doc._id}, function (err, favorites) {
    	
		// check if favorites contains dish
    	if (favorites && favorites.dishes) {
    		// remove from dishes
    		var index = favorites.dishes.indexOf(req.params.id);
    		favorites.dishes.splice(index, 1);

            favorites.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });

    	} else {
    		// nope, not found -- returns null
            res.json(favorites);
    	}
        
    });
    
});

// export router

module.exports = router;
