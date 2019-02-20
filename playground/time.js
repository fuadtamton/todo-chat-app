const moment = require('moment')

var date = new Date().getTime()
console.log(date)

var d = moment().valueOf();
console.log(d)

// console.log(d.format('MMM Do YYYY ,  H:mm '))
// console.log(d.format('h:mm a'))