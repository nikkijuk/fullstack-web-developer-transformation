/*

Register under

/leaders

Operations

GET, PUT, POST and DELETE

Example usage

POST http://localhost:3000/leaders/

{
  "id": 0,
  "name": "Peter Pan",
  "image": "images/alberto.png",
  "designation": "Chief Epicurious Officer",
  "abbr": "CEO",
  "description": "Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother's wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections."
}

*/


var express = require('express');	
var bodyParser = require('body-parser');

//get schema

var mongoose = require('mongoose');
var Leaders = require('../models/leadership');

// init router

var router = express.Router();
router.use(bodyParser.json());

//verify added
var Verify = require('./verify');

// add routes

// withoud id

router.route('/')

// all routes are now verified
.all (Verify.verifyOrdinaryUser, function (req, res, next) {
	next ();
})

.get(function (req, res, next) {
    Leaders.find({}, function (err, found) {
        if (err) throw err;
        res.json(found);
    });
})

.post(function (req, res, next) {
    Leaders.create(req.body, function (err, created) {
        if (err) throw err;
        var id = created._id;
        console.log('Entity created :'+id);

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added entity with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Leaders.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

// with id

router.route('/:id')

// all routes are now verified
.all (Verify.verifyOrdinaryUser, function (req, res, next) {
	next ();
})

.get(function (req, res, next) {
    Leaders.find(req.params.id, function (err, found) {
        if (err) throw err;
        res.json(found);
    });
})

.put(function (req, res, next) {
    Leaders.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, updated) {
        if (err) throw err;
        res.json(updated);
    });
})

.delete(function (req, res, next) {
    Leaders.findByIdAndRemove(req.params.id, function (err, resp) {        
    	if (err) throw err;
        res.json(resp);
    });
});

// export router

module.exports = router;