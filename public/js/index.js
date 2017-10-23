let socket = io();
socket.on('connect', function () {
    console.log('connected to server')
});

socket.on('newMessage', function(newMessage) {
    console.log('Message', newMessage);
});

socket.on('disconnect', function () {
    console.log('disconnected from server')
});

// socket.on('newEmail', function(email) {
//     console.log('New mail', email);
// })