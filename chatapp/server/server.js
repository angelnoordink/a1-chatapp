const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require("./config/database");
const sockets = require('./socket.js');
var http = require("http").Server(app);
var io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});


// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const users = require('./routes/users');
const groups = require('./routes/groups');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json()); 

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/groups', groups);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Setup Socket
sockets.connect(io, port)

// Start Server
http.listen(port, () => {
    console.log('Server started on port' + port);
});

// Apply express middle
app.use(bodyParser.urlencoded({extended: true}));
const url = 'mongodb://localhost:27017';
app.use(express.urlencoded( {extended: false} ));


