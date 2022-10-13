module.exports = function(db, app, ObjectID) {
    // Route to update a single item
    var result;
    app.post('/api/updateuser', function(req, res){

        if (!req.body) {
            return res.sendStatus(400);
        }
        user = req.body;
        var objectid = new ObjectID(user._id)
        const collection = db.collection('users');
        collection.updateOne({_id:objectid},{$set:{username:user.username,email:user.email,role:user.role}},()=>{
            // Return a response to the client to let them know the update was successful
            res.send({'ok':user._id});
        });

    });
    
}