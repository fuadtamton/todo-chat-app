const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { isRealString } = require('./utils/validation');
const { generateMessage, generateLocationMessage } = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express();

app.use(express.static(publicPath))
var server = http.createServer(app);
var io = socketIO(server)

io.on('connection', (socket) => {
    console.log("new user connected")



    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('this is from server')
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback("Name and Room  is required")
        }
        else {
            socket.join(params.room);
            socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"))
            socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", params.name + " has joined"))
            callback()
        }
    })

    socket.on('disconnect', () => {
        console.log("User was disconnected")
    })
})




server.listen(port, () => {
    console.log(`Server is up on ${port}`)
})