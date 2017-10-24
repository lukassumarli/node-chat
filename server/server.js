const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4200;
const app = express();

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'))

    socket.on('createMessage', (userMessage, callback) => {
        console.log('Message received', userMessage)
        io.emit('newMessage', generateMessage(userMessage.from, userMessage.text))
        callback();
     
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('locationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude))
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});


server.listen(port, () => {
    console.log(`Server started at port ${port}`)
});