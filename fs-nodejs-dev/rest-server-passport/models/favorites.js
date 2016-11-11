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
    dishes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}]
    
}, {
    timestamps: true
});

//the schema is useless so far
//we need to create a model using it
var Favorites = mongoose.model('Favorites', favoriteSchema);

//make this available to our Node applications
module.exports = Favorites;