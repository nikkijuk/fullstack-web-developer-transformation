/*
{
      "name": "Weekend Grand Buffet",
      "image": "images/buffet.png",
      "label": "New",
      "price": "19.99",
      "description": "Featuring . . ."
}
*/

// remember: sudo npm install mongoose-currency --save

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// get currency type
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
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
    }
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
var Promotions = mongoose.model('Promotion', promotionSchema);

// make this available to our Node applications
module.exports = Promotions