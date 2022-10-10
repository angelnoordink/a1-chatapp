module.exports = function(db, app, ObjectID) {
    // Route to retrieve a single item

    app.post('/api/getitem', function(req, res){
        console.log("WADE 1");
        if (!req.body) {
            return res.sendStatus(400);
        }
        productID = req.body.productid;
        console.log("WADE 2"+req.body.productid);

        // Create a new mongo Object ID from the passed in _id
        // var objectid = new ObjectID(productID);
        const collection = db.collection('products');
       
        collection.findOne({ 'id':productID }, (err,result) =>{
            if (err) {
                return console.log("error: " + err);
            } else {
                console.log("Found the following document:");
                console.log(result);
                res.send(productID);
            }

            // res.send(data);
        });



    });
    
}