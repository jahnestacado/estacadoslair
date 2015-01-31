(function($) {
    var socket = io.connect("http://estacadoslair.com/");
    var TRANSMISSION_INTERVAL = 200;
    var clientId = Math.random();
    var isSendingCommand;

    function sendCommand(command) {
        setTimeout(function() {
            socket.emit("movement-command", command, clientId);
            if (isSendingCommand) {
                sendCommand(command);
            }
        }, TRANSMISSION_INTERVAL);
    }

    socket.on("lock-controls", function() {
        var controlsElQ = $("#arrow-keys");
        
        if (!controlsElQ.hasClass("locked")) {
            controlsElQ.block({message: "locked"});
            controlsElQ.addClass("locked");
        }
    });

    socket.on("unlock-controls", function() {
        var controlsElQ = $("#arrow-keys");
        
        controlsElQ.unblock();
        controlsElQ.removeClass("locked");
    });

    $("#up, #down, #left, #right").mousedown(function(e) {
        var command = e.target.id;
        isSendingCommand = true;

        sendCommand(command);
    });

    $("#up, #down, #left, #right").mouseup(function() {
        isSendingCommand = false;

        setTimeout(function() {
            socket.emit("inactivate-clientId", clientId);
        }, TRANSMISSION_INTERVAL);
    });

})(jQuery);
