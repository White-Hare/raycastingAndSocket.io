const chatSocket = io('/chat-room');

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

let userName = 'user';


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(input.value){
        chatSocket.emit('chat message', {message: input.value, userName: userName});
        input.value = '';
    }
});


function addMessage(msg, userName = null){
    var item = document.createElement('li');
    
    item.innerHTML = msg;
    item.innerHTML += userName != null ? `</br> <b>${userName}</b>`: '';

    messages.appendChild(item);
}


chatSocket.on('user connected', (userCount)=>{
    addMessage(`<i style="color: grey">user${userCount} connected</i>`);
})



chatSocket.on('login', (args) =>{
    args.messages.forEach(arg => addMessage(arg.message, arg.userName));
    window.scrollTo(0, document.body.scrollHeight);

    userName = args.userName;
});


chatSocket.on('chat message', (args) => {
    addMessage(args.message, args.userName);
    window.scrollTo(0, document.body.scrollHeight);
});


chatSocket.on("connectToRoom", (message)=>{
    addMessage(`<i style="color: blue">${message}</i>`);
});


chatSocket.on('connect_failed', function() {
    document.write("Sorry, there seems to be an issue with the connection!");
 })

// chatSocket.leave("room-1");
