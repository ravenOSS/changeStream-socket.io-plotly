const dotenv = require('dotenv').config()
const app = require('./app')
const server = app.server
const io = require('socket.io')(server)
const testMessage = app.testMessage
// const transmit = app.transmit
const assert = require('assert')

console.log(`Exported app message(core):`)
console.log(testMessage)

const MongoClient = require('mongodb').MongoClient
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

  const transmit = data => {
    // console.log(`io connected? ${socket.connected}`)
    // if (io.connected) {
    io.emit('chartData', data)
    console.log(`Data emitted: ${data}`)
    // }
    // console.log(`No socket connection`)
  }

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

  io.on('connection', socket => {
    startStream()
    console.log(`chartPage connected: ${socket.id}`)
    socket.on('disconnect', () => {
      console.log(`ChartPage disconnected: ${socket.id}`)
    })
  })
})
