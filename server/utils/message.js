var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}

var generateLocationMessage = (from, latitude, longitude) => {
    url = `https://www.google.com/maps?q=${latitude},${longitude}`
    return {
        from,
        url,
        createdAt: new Date().getDate()
    }
}

module.exports = { generateMessage, generateLocationMessage }