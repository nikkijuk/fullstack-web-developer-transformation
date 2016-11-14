/*
 {
      "name": "Uthapizza",
      "image": "images/uthapizza.png",
      "category": "mains",
      "label": "Hot",
      "price": "4.99",
      "description": "A unique . . .",
      "comments": [
        {
          "rating": 5,
          "comment": "Imagine all the eatables, living in conFusion!",
          "author": "John Lemon"
        },
        {
          "rating": 4,
          "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
          "author": "Paul McVites"
        }
      ]
}
 */

// remember: sudo npm install mongoose-currency --save

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// get currency type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

// create a schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    // optional, defaults to empty string
    label: {
        type: String,
        default: ''
    },
    // price is stored usign string, type is currency
    // as extra given that price should be always positive -- no upper limit 
    price: {
        type: Currency,
        required: true,
        min: 0
    },    
    description: {
        type: String,
        required: true
    },
    comments:[commentSchema]
}, 
{
    timestamps: true,
    // By default, mongoose only applies defaults when you create a new document. 
    // It will not set defaults if you use update() and findOneAndUpdate(). 
    // However, mongoose 4.x lets you opt-in to this behavior using the setDefaultsOnInsert option.
    upsert: true,    
    setDefaultsOnInsert: true    
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;