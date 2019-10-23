const dotenv = require('dotenv').config()
const assert = require('assert')
const app = require('./app')
const io = app.io

const testMessage = app.testMessage // debug

console.log(`Exported app message(core): ${testMessage}`) // debug

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
    io.emit('chartData', data)
    console.log(`Data emitted: ${data}`)
  }

  const startStream = () => { // add test for cursor available
    console.log(`startStream`)
    changeStream = collection.watch([pipeline], {
      fullDocument: 'updateLookup' })
    changeStream.on('change', document => {
      const packet = []
      packet[0] = document.fullDocument.TimeStamp // could come from object:_id
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
