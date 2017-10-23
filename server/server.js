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


    socket.on('createMessage', (userMessage) => {
        console.log('Message received', userMessage)
        io.emit('newMessage', {
            from: userMessage.from,
            text: userMessage.text,
            createdAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});


server.listen(port, () => {
    console.log(`Server started at port ${port}`)
});