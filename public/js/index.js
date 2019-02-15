var socket = io();
socket.on('connect', function () {
    console.log("connected to server")

    socket.emit('createMessage', {
        from: 'fuad',
        text: 'where are you'
    })
    socket.on('newMessage', (message) => {
        console.log("New message ", message)
    })
})
socket.on('disconnect', function () {
    console.log("Disconnected from server")
})
socket.on('newEmail', function (email) {
    console.log("new email", email)
})