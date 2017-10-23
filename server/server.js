const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4200;
const app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    // socket.emit('newEmail', {
    //     'from': 'lukassumarli@gmail.com',
    //     'text': 'Dinner at 7pm',
    //     'createdAt': 123456
    // });

    // socket.on('createEmail', (email) => {
    //     console.log('creating new email', email)
    // });
    socket.emit('newMessage', {
        from: 'jonstall2015',
        text: `Hello dude, what's up!!`,
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (userMessage) => {
        console.log('Message received', userMessage)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});


server.listen(port, () => {
    console.log(`Server started at port ${port}`)
});