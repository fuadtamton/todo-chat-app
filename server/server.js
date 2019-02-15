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
        from: 'fuadtamton@gmail.com',
        text: "something to do",
        createdAt: 123
    })
    socket.on('createMessage', (message) => {
        console.log('create message', message);
    })

    socket.on('disconnect', () => {
        console.log("User was disconnected")
    })
})




server.listen(port, () => {
    console.log(`Server is up on ${port}`)
})