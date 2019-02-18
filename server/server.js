const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express();

app.use(express.static(publicPath))
var server = http.createServer(app);
var io = socketIO(server)

io.on('connection', (socket) => {
    console.log("new user connected")

    socket.emit('newMessage', {
        from: "Admin",
        text: "Welcome to the chat app",
        createdAt: new Date().getDate()
    })

    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New user joined",
        createdAt: new Date().getDate()
    })

    socket.on('createMessage', (message) => {
        console.log('create message', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
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