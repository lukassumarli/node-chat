let socket = io();
socket.on('connect', function () {
    console.log('connected to server')

    // socket.emit('createEmail', {
    //     to: 'jonstall@gmial.com',
    //     text: 'dinner next week'
    // })
    socket.emit('createMessage', {
        from: 'Gemini7806',
        text: `Hey havent seen you in a while`
    });
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