var socket = io();
socket.on('connect', function () {
    console.log("connected to server")
})

socket.emit('createMessage', {
    from: 'fuad',
    text: 'hi everyone'
}, function (data) {
    console.log("got it ", data)
})

socket.on('newMessage', (message) => {
    console.log("New message ", message)
    var li = jQuery('<li></li>');
    li.text(message.from + " : " + message.text)

    jQuery('#messages').append(li)

})

socket.on('disconnect', function () {
    console.log("Disconnected from server")
})


jQuery('#message-form').on('submit', function (event) {
    event.preventDefault()
    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name=message]').val()
    }, function () {

    })
})