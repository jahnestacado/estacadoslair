(function($) {
    var socket = io.connect('http://localhost:8089');

    $("#up").click(function() {
        socket.emit("up", "up-command");
    });

    $("#down").click(function() {
        console.log("pressed down")
        socket.emit("down", "down-command");
    });

    $("#left").click(function() {
        socket.emit("left", "left-command");
    });

    $("#right").click(function() {
        console.log("pressed right")
        socket.emit("right", "right-command");
    });

})(jQuery);
