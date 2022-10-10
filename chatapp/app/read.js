exports.findUsers = function(collection, queryJSON, callback) {
    // Find documents
    collection.find(queryJSON).toArray(function(err, docs) {
        console.log("Found the following records:");
        console.log(docs);
        callback(docs);
    });
}