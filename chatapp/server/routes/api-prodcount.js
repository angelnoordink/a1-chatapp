module.exports = function(db, app) {
    // Route to count of all items from the database.

    app.get('/api/prodcount', function(req, res){

        if (!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('products');
        collection.find({}).toArray((err,count)=>{
            res.send({'count':count});
        });


    });

}