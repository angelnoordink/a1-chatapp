var express = require('express');
var app = express();
var cors = require('cors');
var http = require("http").Server(app);
var io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
const sockets = require('./socket.js')
const server = require('./listen.js')
// const request = require('request')

// Define port used for server
const PORT = 3000;

// Apply express middlew
app.use(cors());

// Setup Socket
sockets.connect(io, PORT)

// Start server listening for requests
server.listen(http, PORT);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.urlencoded( {extended: false} ));

app.post('/login', require('./routes/postLogin'))
app.post('/loginafter', require('./routes/postLoginAfter'))
