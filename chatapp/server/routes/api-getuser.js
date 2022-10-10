module.exports = function(db, app, ObjectID) {
    // Route to retrieve a single item

    app.post('/api/getuser', function(req, res){
        if (!req.body) {
            return res.sendStatus(400);
        }
        userID = req.body._id;

        // Create a new mongo Object ID from the passed in _id
        var objectid = new ObjectID(userID);
        const collection = db.collection('products');
       
        collection.findOne({ 'id':userID }, (err,result) =>{
            if (err) {
                return console.log("error: " + err);
            } else {
                res.send(userID);
            }

            // res.send(data);
        });



    });
    
}