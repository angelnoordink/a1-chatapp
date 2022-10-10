const { ObjectID } = require("bson");
const { ObjectId } = require("mongodb");

module.exports = function(db, app) {
    // Route to update a single item
    var result;
    app.post('/api/updateuser', function(req, res){

        if (!req.body) {
            return res.sendStatus(400);
        }
        user = req.body;
        var object = new ObjectID(user._id)
        const collection = db.collection('users');
        collection.updateOne({_id:objectid},{$set:{name:user.username,email:user.email,super_admin_ind:user.super_admin_ind}},()=>{
            // Return a response to the client to let them know the update was successful
            res.send({user});
        });

    });
    
}