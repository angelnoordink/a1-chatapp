module.exports = function(db, app) {
    // Route to manage adding a user

    app.post('/api/adduser', function(req, res){

        if (!req.body) {
            return res.sendStatus(400);
        }
        user = req.body;
        const collection = db.collection('users');
        // check for duplicate id's
        collection.find({'id':user.id}).count((err,count)=>{
            if (count==0){
                // If no duplicate
                collection.insertOne(user,(err,dbres)=>{
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    // Send back to client number of items inserted and no error message
                    res.send({'num':num,err:null});
                });
            } else{
                // On error send back error message
                res.send({num:0, err:"Duplicate User"});
            }
        });

    });

}