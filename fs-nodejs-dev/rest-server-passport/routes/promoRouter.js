/*

Register under

/promotions

Operations

GET, PUT, POST and DELETE

Example usage

POST http://localhost:3000/promotions/

{
  "id": 0,
  "name": "Weekend Grand Buffet",
  "image": "images/buffet.png",
  "label": "New",
  "price": "19.99",
  "description": "Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person "
}

*/
	
var express = require('express');	
var bodyParser = require('body-parser');

//get schema

var mongoose = require('mongoose');
var Promotions = require('../models/promotions');

// init router

var router = express.Router();
router.use(bodyParser.json());

// verify added
var Verify = require('./verify');

// add routes

// withoud id

router.route('/')

// all routes are now verified
.all (Verify.verifyOrdinaryUser, function (req, res, next) {
	next ();
})

.get(function (req, res, next) {
    Promotions.find({}, function (err, found) {
        if (err) throw err;
        res.json(found);
    });
})

.post(Verify.verifyAdmin, function (req, res, next) {
    Promotions.create(req.body, function (err, created) {
        if (err) throw err;
        var id = created._id;
        console.log('Entity created :'+id);

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added entity with id: ' + id);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Promotions.remove({}, function (err, resp) {
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
    Promotions.find(req.params.id, function (err, found) {
        if (err) throw err;
        res.json(found);
    });
})

.put(Verify.verifyAdmin, function (req, res, next) {
    Promotions.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, updated) {
        if (err) throw err;
        res.json(updated);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Promotions.findByIdAndRemove(req.params.id, function (err, resp) {        
    	if (err) throw err;
        res.json(resp);
    });
});

// export router

module.exports = router;