const express = require('express')
require('./changeStreamCore')
require('./exportTesting')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const plotlyChartRouter = require('./routes/plotlyChart')
const indexRouter = require('./routes/index')

const app = express()
const port = 3300

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static('views', { index: false, extensions: ['html'] }))
// app.use(express.static(path.join(__dirname, 'views'), { index: false, extensions: ['html'] }))
// app.use(serveStatic(path.join(__dirname, 'views')))

app.use('/plotlyChart', plotlyChartRouter)
app.use('/index', indexRouter)

const server = require('http').createServer(app)
// exports.server = require('http').createServer(app)

exports.testMessage = 'App.js here!'
// console.log(`App testMessage: ${testMessage}`)

// // /**
// //  * Create socket.io instance
// //  */
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log(`chartPage connected: ${socket.id}`)
  socket.on('disconnect', () => {
    console.log(`ChartPage disconnected: ${socket.id}`)
  })
})

// transmit needs to test for active connection before emitting data
exports.transmit = data => {
// const transmit = data => {
  // console.log(`io connected? ${socket.connected}`)
  // if (io.connected) {
  io.emit('chartData', data)
  console.log(`Data emitted: ${data}`)
  // }
  // console.log(`No socket connection`)
}
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Server listening on port ${port}`))
// module.exports.transmit = transmit

// module.exports = { transmit, testMessage }
// module.exports.transmit = transmit
// module.exports.testMessage = testMessage
// ===================================================
// const dotenv = require('dotenv').config()
// const MongoClient = require('mongodb').MongoClient
// // const io = require('socket.io')
// const assert = require('assert')
// const atlasURL = process.env.atlasURL

// const client = new MongoClient(atlasURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   keepAlive: true,
//   connectTimeoutMS: 60000,
//   socketTimeoutMS: 60000
// })

// client.connect(err => {
//   assert.strictEqual(null, err)
//   if (err) {
//     console.log(`We've got a problem`)
//   } else {
//     console.log('Connected successfully to MongoDB')
//   }
//   const db = client.db('plottingData')
//   const collection = db.collection('streamTest')
//   const pipeline = {
//     $match: {
//       operationType: {
//         $in: ['insert']
//       }
//     }
//   }

//   let changeStream

//   const startStream = () => {
//     console.log(`startStream`)
//     changeStream = collection.watch([pipeline], {
//       fullDocument: 'updateLookup' })
//     changeStream.on('change', document => {
//       const packet = []
//       packet[0] = document.fullDocument.TimeStamp
//       packet[1] = document.fullDocument.Data
//       transmit(packet)
//       console.log(`Packet sent from startStream: ${packet[0]}`)
//     })
//   }
//   startStream()
// })
