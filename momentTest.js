const moment = require('moment')

// let now = moment()

setInterval(() => {
  console.log(`Time Now: ${moment().format('MMM Do, h:mm')}`)
}, 750)
