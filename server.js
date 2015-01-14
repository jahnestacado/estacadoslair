var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(8089);

app.use(express.static('public'));

io.sockets.on('connection', function(socket) {
    console.log("OnConnection ");

    socket.on("up", function() {
        console.log("up-command");
    });

    socket.on("down", function() {
        console.log("down-command");
    });

    socket.on("left", function() {
        console.log("left-command");
    });

    socket.on("right", function() {
        console.log("right-command");
    });

});