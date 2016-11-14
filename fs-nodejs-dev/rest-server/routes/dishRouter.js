/*

Register under

/dishes

Operations

GET, PUT, POST and DELETE

Example usage

POST http://localhost:3000/dishes/

	{
  "id": 0,
  "name": "Uthapizza",
  "image": "images/uthapizza.png",
  "category": "mains",
  "label": "Hot",
  "price": 4.99,
  "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer."
}

*/


var express = require('express');
var bodyParser = require('body-parser');

// get schema

var mongoose = require('mongoose');
var Dishes = require('../models/dishes');

// init router

var router = express.Router();
router.use(bodyParser.json());

// add routes

// withoud id

router.route('/')
.get(function (req, res, next) {
    Dishes.find({}, function (err, found) {
        if (err) throw err;
        res.json(found);
    });
})

.post(function (req, res, next) {
    Dishes.create(req.body, function (err, created) {
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
    Dishes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

// with id

router.route('/:id')
.get(function (req, res, next) {
 // findById doesn't work direcltly with current version of Mongoose
 // http://stackoverflow.com/questions/17223517/mongoose-casterror-cast-to-objectid-failed-for-value-object-object-at-path 
 // Dishes.findById(req.params.id, function (err, found) {
    Dishes.find (req.params.id, function (err, found) {
        if (err) throw err;
        res.json(found);
    });
})

.put(function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, updated) {
        if (err) throw err;
        res.json(updated);
    });
})

.delete(function (req, res, next) {
    Dishes.findByIdAndRemove(req.params.id, function (err, resp) {        
    	if (err) throw err;
        res.json(resp);
    });
});

// comments root

router.route('/:dishId/comments')
.get(function (req, res, next) {
//  Dishes.findById(req.params.dishId, function (err, dish) {
    Dishes.find(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(function (req, res, next) {
//    Dishes.findById(req.params.dishId, function (err, dish) {
    Dishes.find(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
//    Dishes.findById(req.params.dishId, function (err, dish) {
    Dishes.find (req.params.dishId, function (err, dish) {
        if (err) throw err;
        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

// comments with id

router.route('/:dishId/comments/:commentId')
.get(function (req, res, next) {
//    Dishes.findById(req.params.dishId, function (err, dish) {
    Dishes.find (req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
//    Dishes.findById(req.params.dishId, function (err, dish) {
    Dishes.find (req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
//    Dishes.findById(req.params.dishId, function (err, dish) {
    Dishes.find(req.params.dishId, function (err, dish) {
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});


// export router

module.exports = router;


