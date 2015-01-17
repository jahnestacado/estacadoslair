(function($) {
    var socket = io.connect('http://localhost:8089');
    var isSendingCommand;

    function sendCommand(command, shouldContinue) {
        setTimeout(function() {
            socket.emit("movement-command", command);
            if (shouldContinue()) {
                sendCommand(command, shouldContinue);
            }
        }, 200);
    }

    $("#up, #down, #left, #right").mousedown(function(e) {
        var command = e.target.id;
        isSendingCommand = true;

        sendCommand(command, function() {
            return isSendingCommand;
        });
    });

    $("#up, #down, #left, #right").mouseup(function() {
        isSendingCommand = false;
    });

})(jQuery);
