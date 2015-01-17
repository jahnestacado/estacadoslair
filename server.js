var piBlaster = require("pi-blaster.js");
var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(8089);

var Y_AXIS_PIN = 4;

var max_Y_Axis = 0.14;
var min_Y_Axis = 0.07;

var Y_Axis_Value = 0.10;

function roundTo2Decimals(number) {
    return Math.round(number * 100) / 100;
}

function moveServoUp() {
    if (Y_Axis_Value < max_Y_Axis) {
        Y_Axis_Value += 0.01;
        piBlaster.setPwm(Y_AXIS_PIN, roundTo2Decimals(Y_Axis_Value));
    }
}

function moveServoDown() {
    if (Y_Axis_Value > min_Y_Axis) {
        Y_Axis_Value -= 0.01;
        piBlaster.setPwm(Y_AXIS_PIN, roundTo2Decimals(Y_Axis_Value));
    }
}

app.use(express.static('public'));

io.sockets.on('connection', function(socket) {
    console.log("OnConnection ");

    socket.on("up", function() {
        console.log("up-command");
        moveServoUp();
    });

    socket.on("down", function() {
        console.log("down-command");
        moveServoDown();
    });

    socket.on("left", function() {
        console.log("left-command");
    });

    socket.on("right", function() {
        console.log("right-command");
    });

});