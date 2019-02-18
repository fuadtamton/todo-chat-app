var socket = io();
socket.on('connect', function () {
    console.log("connected to server")
})


socket.on('newMessage', (message) => {
    var li = jQuery('<li></li>');
    li.text(message.from + " : " + message.text)

    jQuery('#messages').append(li)

})
socket.on('newLocationMessage', (message) => {
    const li = jQuery('<li></li>')
    const a = jQuery('<a target="_blank" >My Current Location</a>')
    li.text(`${message.from}: `)
    a.attr('href', message.url)
    li.append(a)
    jQuery('#messages').append(li)
})

socket.on('disconnect', function () {
    console.log("Disconnected from server")
})


jQuery('#message-form').on('submit', function (event) {
    const messageTextBox = jQuery('[name=message]')
    event.preventDefault()
    socket.emit('createMessage', {
        from: 'user',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    })
})

const locationButton = jQuery('#location-button')
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert("Your browser doesn't suppert this feature")
    }
    locationButton.attr('disabled','disabled').text('sending location...')
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled');
        alert("Unable to fetch location")
    })

})