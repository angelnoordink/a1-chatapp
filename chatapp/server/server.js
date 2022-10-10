const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require("./config/database");
// const sockets = require('./socket.js');

// var http = require("http").Server(app);
// var io = require('socket.io')(http,{
//     cors: {
//         origin: "http://localhost:4200",
//         methods: ["GET", "POST"]
//     }
// });

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'src')));

// Body Parser Middleware
app.use(bodyParser.json()); 

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port' + port);
});




// Apply express middle
// app.use(bodyParser.urlencoded({extended: true}));
// const url = 'mongodb://localhost:27017';

// app.use(express.urlencoded( {extended: false} ));

// Setup Socket
// sockets.connect(io, port)


// Use connect method to connect to server
// MongoClient.connect(url, {maxPoolSize: 10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
//     // Callback function code. When we have a connection start the rest of the app.
//     if (err) {return console.log(err)}
//         const dbName = 'chatdb';
//         const db = client.db(dbName);

//         require('./routes/api-adduser.js')(db,app);
//         require('./routes/api-usercount.js')(db,app);
//         require('./routes/api-validid.js')(db,app);
//         require('./routes/api-getuserlist.js')(db,app);
//         require('./routes/api-getuser.js')(db,app,ObjectID);
//         require('./routes/api-updateuser.js')(db,app,ObjectID);
//         require('./routes/api-deleteuser.js')(db,app,ObjectID);

//     // Start the server listening on port 3000. Outputs message to console once server has started.
//     // require('./listen.js')(http);
// });
