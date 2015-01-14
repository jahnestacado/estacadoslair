(function($) {
    var socket = io.connect('http://localhost:8089');

    var sendingUp;
    var sendingDown;
    var sendingLeft;
    var sendingRight;

    function sendCommand(command, shouldContinue) {
        setTimeout(function() {
            socket.emit(command);
            if (shouldContinue()) {
                sendCommand(command, shouldContinue);
            }
        }, 200);
    }

    $("#up, #down, #left, #right").mousedown(function(e) {
        var command = e.target.id;
        switch (e.target.id) {
            case "up" :
                sendingUp = true;
                sendCommand(command, function() {
                    return sendingUp;
                });
                break;
            case "down" :
                sendingDown = true;
                sendCommand(command, function() {
                    return sendingDown;
                });
                break;
            case "left" :
                sendingLeft = true;
                sendCommand(command, function() {
                    return sendingLeft;
                });
                break;
            case "right" :
                sendingRight = true;
                sendCommand(command, function() {
                    return sendingRight;
                });
                break;
        }
    });

    $("#up, #down, #left, #right").mouseup(function(e) {
        switch (e.target.id) {
            case "up" :
                sendingUp = false;
                break;
            case "down" :
                sendingDown = false;
                break;
            case "left" :
                sendingLeft = false;
                break;
            case "right" :
                sendingRight = false;
                break;
        }
    });

})(jQuery);
