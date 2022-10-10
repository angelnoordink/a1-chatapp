exports.updateUser = function(collection, queryJSON, updateJSON, callback) {
    // Update document with queryJSON, set updateJSON
    collection.updateOne(queryJSON, { $set: updateJSON }, function(err, result) {
        console.log("For the documents with:");
        console.log(queryJSON);
        console.log("SET:");
        console.log(updateJSON);
        callback(result);
    });
}