var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);
    console.log("Connected correctly to server");
    var collection = db.collection("dishes");

    // insert new content to db
    collection.insertOne({name: "Uthapizza", description: "test"}, function(err,result){
    	assert.equal(err,null);
        console.log("After Insert:");
        console.log(result.ops);
        
        // find db content
        collection.find({}).toArray(function(err,docs){
	        assert.equal(err,null);
	        console.log("Found:");
	        console.log(docs);
	        
	        // delete collection
			db.dropCollection("dishes", function(err, result){
				assert.equal(err,null);
				
				// close db
				db.close();
			});
        });
    });
});