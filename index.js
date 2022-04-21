const express = require('express');
var http = require('http');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = require('socket.io')(server);

// middleware
app.use(express.json());    // For decoding json data
var clients = {};

io.on('connection', (socket) => {
    console.log('connected');
    console.log(socket.id, ' has joined');
    socket.on('signin', (id) => {
        console.log(id);
        clients[id] = socket;
        console.log(clients);
    });
    socket.on('message', (msg) => {
        console.log(msg);
        let receiverId = msg.receiverId;
        console.log(receiverId);
        if (clients[receiverId]) clients[receiverId].emit('message', msg);
    });
});

// Just to test it is working fine or not after deploying
app.route('/check').get((req, res) => {
    return res.json('Your app is working fine.');
});

// Added 0.0.0.0 to run server from local ip address
server.listen(port, '0.0.0.0', () => {
    console.log(`Your server is running on port ${port}`);
});