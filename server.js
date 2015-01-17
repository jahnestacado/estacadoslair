var piBlaster = require("pi-blaster.js");
var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(8089);

//GPIO Pins
var Y_AXIS_PIN = 4;
var X_AXIS_PIN = 17;

//Y axis boundaries
var max_Y_Axis = 0.14;
var min_Y_Axis = 0.07;

//X axis boundaries
var max_X_Axis = 0.23;
var min_X_Axis = 0.15;

var SERVO_MOVEMENT_SPEED = 0.002;

//Axises position trackers (initially default position at center)
var Y_Axis_Value = 0.10;
var X_Axis_Value = 0.187;

//Set starting position
piBlaster.setPwm(Y_AXIS_PIN, Y_Axis_Value);
piBlaster.setPwm(X_AXIS_PIN, X_Axis_Value);

//Served folders
app.use(express.static('public'));

io.sockets.on('connection', function(socket) {
    console.log("OnConnection ");


    socket.on("movement-command", function(command) {
        switch (command) {
            case "up" :
                moveServoUp();
                break;
            case "down":
                moveServoDown();
                break;
            case "left":
                moveServoLeft();
                break;
            case "right":
                moveServoRight();
                break;
        }
    });

});

function roundTo3Decimals(number) {
    return Math.round(number * 1000) / 1000;
}

function moveServoUp() {
    if (Y_Axis_Value < max_Y_Axis) {
        Y_Axis_Value += SERVO_MOVEMENT_SPEED;
        piBlaster.setPwm(Y_AXIS_PIN, roundTo3Decimals(Y_Axis_Value));
    }
}

function moveServoDown() {
    if (Y_Axis_Value > min_Y_Axis) {
        Y_Axis_Value -= SERVO_MOVEMENT_SPEED;
        piBlaster.setPwm(Y_AXIS_PIN, roundTo3Decimals(Y_Axis_Value));
    }
}

function moveServoLeft() {
    if (X_Axis_Value > min_X_Axis) {
        X_Axis_Value -= SERVO_MOVEMENT_SPEED;
        piBlaster.setPwm(X_AXIS_PIN, roundTo3Decimals(X_Axis_Value));
    }
}

function moveServoRight() {
    if (X_Axis_Value < max_X_Axis) {
        X_Axis_Value += SERVO_MOVEMENT_SPEED;
        piBlaster.setPwm(X_AXIS_PIN, roundTo3Decimals(X_Axis_Value));
    }
}