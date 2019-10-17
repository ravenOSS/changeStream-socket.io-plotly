
// //  * Create socket.io instance

// const app = require('./app.js')
// const io = require('socket.io')(app.server)

console.log(`TestText from app.js in socket.js: ${app.testvariable}`)

io.on('connection', socket => {
  console.log(`Client connected: ${socket.id}`)
  socket.emit('serverMsg', 'Hello again, client')
  socket.on('clientMsg', (msg) => {
    console.log(`Client message: ${msg}`)
  })
})

const transmit = data => { // Test for and capture socket.id
  io.emit('chartData', data)
  console.log(`Data emitted: ${data}`)
}

// module.exports = { transmit, io }
exports.io = io
exports.transmit = transmit
