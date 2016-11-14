// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    
    // reference to user document defined
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    // this was tricky to me -- list of object id's 
    // it might be that api has changed here at some point : https://github.com/Automattic/mongoose/issues/1499
    // I don't know if index is really needed or has effect here -- I didn't manage to get dishes.id(xx) method to function as expected
    
    // dishes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish', index:true}]
    // dishes: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }], index: true },
    // dishes: [{type: String, ref: 'Dish', index:true}]
    
    dishes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish', index:true}]
    
}, {
    timestamps: true
});

//the schema is useless so far
//we need to create a model using it
var Favorites = mongoose.model('Favorites', favoriteSchema);

//make this available to our Node applications
module.exports = Favorites;