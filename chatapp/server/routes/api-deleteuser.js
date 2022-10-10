module.exports = function(db, app, ObjectID) {
    // Route to delete a single item

    app.post('/api/deleteuser', function(req, res){

        if (!req.body) {
            return res.sendStatus(400);
        }
        userID = req.body._id;

        // Create a new mongo Object ID from the passed in _id
        var objectid = new ObjectID(userID);
        const collection = db.collection('users');

        // Delete a single item based on its unique ID.
        collection.deleteOne({_id:userID},(err,docs)=>{
            // Get a new listing of all items in the database and return to client
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            });
        });

    });
    
}