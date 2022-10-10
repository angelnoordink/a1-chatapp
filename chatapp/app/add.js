exports.addUsers = function(collection, docArray, callback) {
    // Insert products
    collection.insertMany(docArray, function(err, result) {
        console.log("Inserted the following documents into the collection:");
        console.log(docArray);
        callback(result);
    });
}