module.exports = (io) => {
    var gameRoom = io.of('game');

    gameRoom.on('connection', (socket) => {
        console.log("welcome to the game");

        socket.on('player-move', (args) => {
            socket.broadcast.emit('player-move', args);
        });
    });
}