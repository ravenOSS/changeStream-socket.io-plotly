// const app = require('./app.js')
// const io = require('socket.io')(app.server)

console.log(`App message: ${app.testMessage}`)
// console.log(`TestText from app.js in socket.js: ${app.testvariable}`)

io.on('connection', socket => {
  console.log(`chartPage connected: ${socket.id}`)
  socket.on('disconnect', () => {
    console.log(`ChartPage disconnected: ${socket.id}`)
  })
})

exports.transmit = data => { // Test for and capture socket.id
  io.emit('chartData', data)
  console.log(`Data emitted from socket: ${data}`)
}

// module.exports = { transmit, io }
// exports.io = io
// exports.transmit = transmit
