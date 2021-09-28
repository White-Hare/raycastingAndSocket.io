let messages = [];
let users = [];


const sortUsers = () => {
    for (let i = 0; i < users.length; i++)
        for (let j = 1; j < users.length; j++) {
            let a = users[i];
            let b = users[j];

            if (a.id > b.id) {
                users[i] = b;
                users[j] = a;
            }
        }
}


const registerUser = (socketId) => {
    let finalUser = {
        socketId: socketId,
        id: 1
    };



    for (let i = 1; i < users.length + 1; i++) {
        let u = users.find(user => user.id === i);
        console.log(u);

        if (u == null) {
            finalUser.id = i;
            users.push(finalUser);
            return finalUser;
        }
    }



    finalUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    users.push(finalUser);
    return finalUser;
}


module.exports = (io) => {
    var chatRoom = io.of('chat-room');

    chatRoom.on('connection', (socket) => {
        let room = "room-" + (parseInt(users.length / 2) + 1);
        console.log(room);

        socket.join(room);
        chatRoom.in(room).emit('connectToRoom', "You are in " + room);


        let user = registerUser(socket.id);


        console.log('user connected');

        socket.broadcast.emit(`user connected`, user.id);
        chatRoom.to(socket.id) //socket.
            .emit('login', {
                messages: messages,
                userName: 'user' + user.id
            });



        socket.on('disconnect', () => {
            let index = users.indexOf(users.find(user => user.socketId === socket.id))
            users.splice(index, 1);
            sortUsers();

            console.log('user disconnected')
        });

        socket.on('chat message', (args) => {
            console.log('Message: ' + args.message);

            messages.push(args);
            chatRoom.emit('chat message', args);
        });
    });
}