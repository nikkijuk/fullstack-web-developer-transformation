// welcome to callback hell

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var dboper = require('./operations');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    // #1: insert content
    dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes", function (result) {
            console.log(result.ops);

            // #2: find content
            dboper.findDocuments(db, "dishes", function (docs) {
                console.log(docs);

                // #3: update content
                dboper.updateDocument(db, { name: "Vadonut" },{ description: "Updated Test" }, "dishes", function (result) {
                        console.log(result.result);

                        // #4: find
                        dboper.findDocuments(db, "dishes", function (docs) {
                            console.log(docs)

                            // #5:  drop all
                            db.dropCollection("dishes", function (result) {
                                console.log(result);

                                // #6: close
                                db.close();
                            });
                        });
                    });
            });
        });
});