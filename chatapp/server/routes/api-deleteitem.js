module.exports = function(db, app, ObjectID) {
    // Route to delete a single item

    app.post('/api/deleteitem', function(req, res){

        console.log("TEST")
        if (!req.body) {
            return res.sendStatus(400);
        }
        productID = req.body.productid;

        // Create a new mongo Object ID from the passed in _id
        // var objectid = new ObjectID(productID);
        const collection = db.collection('products');

        // Delete a single item based on its unique ID.
        collection.deleteOne({'id':productID},(err,docs)=>{
            console.log("delete" + productID)
            // Get a new listing of all items in the database and return to client
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            });
        });

    });
    
}