const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'; // Connection URL
const dbName = 'chatdb'; // Database Name
const usersColName = 'users'; // Collection Name
const groupsColName = 'groups'; // Collection Name
const client = new MongoClient(url); // Create a new MongoClient

// Use connect method to connect to server
client.connect(function(err) {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection.usersColName;
    client.close();
});