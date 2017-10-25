const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4200;
const app = express();

let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('name and room name required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'))
        
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

        callback();
    })

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
        let user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has fallen`));
        }

    })
});


server.listen(port, () => {
    console.log(`Server started at port ${port}`)
});