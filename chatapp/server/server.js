var express = require('express');
var app = express();
var http = require("http").Server(app);
var cors = require('cors');
var bodyParser = require('body-parser');
var io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
const sockets = require('./socket.js');

const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const PORT = 3000;

// Apply express middle
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 
const url = 'mongodb://localhost:27017';

app.use(express.urlencoded( {extended: false} ));

// Setup Socket
sockets.connect(io, PORT)

// Use connect method to connect to server
MongoClient.connect(url, {maxPoolSize: 10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    // Callback function code. When we have a connection start the rest of the app.
    if (err) {return console.log(err)}
        const dbName = 'chatdb';
        const db = client.db(dbName);

        require('./routes/api-adduser.js')(db,app);
        require('./routes/api-prodcount.js')(db,app);
        require('./routes/api-validid.js')(db,app);
        require('./routes/api-getuserlist.js')(db,app);
        require('./routes/api-getitem.js')(db,app,ObjectID);
        require('./routes/api-update.js')(db,app,ObjectID);
        require('./routes/api-deleteitem.js')(db,app,ObjectID);
        
    // Start the server listening on port 3000. Outputs message to console once server has started.
    require('./listen.js')(http);

});
