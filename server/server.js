const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage } = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express();

app.use(express.static(publicPath))
var server = http.createServer(app);
var io = socketIO(server)

io.on('connection', (socket) => {
    console.log("new user connected")

    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"))

    socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined"))

    socket.on('createMessage', (message, callback) => {
        console.log('create message', message);
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('this is from server')
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('disconnect', () => {
        console.log("User was disconnected")
    })
})




server.listen(port, () => {
    console.log(`Server is up on ${port}`)
})