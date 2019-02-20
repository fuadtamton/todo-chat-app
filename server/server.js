const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { Users } = require('./utils/users');
const { isRealString } = require('./utils/validation');
const { generateMessage, generateLocationMessage } = require('./utils/message')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express();
var server = http.createServer(app);
var io = socketIO(server)
var users = new Users();
app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log("new user connected")



    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id)
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }
        callback('this is from server')
    })

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id)
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    })

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and Room  is required")
        }
        else {
            socket.join(params.room);
            users.removeUser(params.id);
            users.addUser(socket.id, params.name, params.room);

            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"))
            socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", params.name + " has joined"))
            callback()
        }
    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', user.name + " has left"))
        }
    })
})




server.listen(port, () => {
    console.log(`Server is up on ${port}`)
})