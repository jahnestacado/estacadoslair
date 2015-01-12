var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(8089);

app.use(express.static('public'));

io.sockets.on('connection', function(socket) {
    console.log("OnConnection ");

    socket.on("up", function(command) {
        console.log(command);
    });

    socket.on("down", function(command) {
        console.log(command);
    });

    socket.on("left", function(command) {
        console.log(command);
    });

    socket.on("right", function(command) {
        console.log(command);
    });

});