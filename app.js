const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// const indexRouter = require('./routes/index')
// const chartRouter = require('./routes/chart')
const plotlyChartRouter = require('./routes/plotlyChart')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static('views', { index: false, extensions: ['html'] }))
// app.use(express.static(path.join(__dirname, 'views'), { index: false, extensions: ['html'] }))
// app.use(serveStatic(path.join(__dirname, 'views')))

const port = 3300

// app.use('/', indexRouter)
// app.use('/chart', chartRouter)
app.use('/plotlyChart', plotlyChartRouter)

// app.listen(port, () => console.log(`Server listening on port ${port}`))

const server = require('http').createServer(app)

// // /**
// //  * Create socket.io instance
// //  */
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log(`Client connected: ${socket.id}`)
  socket.emit('serverMsg', 'Hello again, client')
  socket.on('clientMsg', (msg) => {
    console.log(`Client message: ${msg}`)
  })
})
// transmit needs to test for active connection before emitting data
const transmit = data => {
  io.emit('chartData', data)
  console.log(`Data emitted: ${data}`)
}
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`Server listening on port ${port}`))
// ===================================================
const dotenv = require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
// const io = require('socket.io')
const assert = require('assert')
const atlasURL = process.env.atlasURL

const client = new MongoClient(atlasURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  connectTimeoutMS: 60000,
  socketTimeoutMS: 60000
})

client.connect(err => {
  assert.strictEqual(null, err)
  if (err) {
    console.log(`We've got a problem`)
  } else {
    console.log('Connected successfully to MongoDB')
  }
  const db = client.db('plottingData')
  const collection = db.collection('streamTest')
  const pipeline = {
    $match: {
      operationType: {
        $in: ['insert']
      }
    }
  }

  let changeStream

  const startStream = () => {
    console.log(`startStream`)
    changeStream = collection.watch([pipeline], {
      fullDocument: 'updateLookup' })
    changeStream.on('change', document => {
      const packet = []
      packet[0] = document.fullDocument.TimeStamp
      packet[1] = document.fullDocument.Data
      transmit(packet)
    })
  }
  startStream()

//   // const transmit = (data) => {
//   //   console.log(`packet: ${data}`)
//   // }
})
