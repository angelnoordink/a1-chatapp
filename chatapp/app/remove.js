exports.removeUser = function(collection, queryJSON, callback) {
    // Remove document
    collection.deleteOne(queryJSON, function(err, result) {
        console.log("Removed the documents with:");
        console.log(queryJSON);
        callback(result);
    });
}