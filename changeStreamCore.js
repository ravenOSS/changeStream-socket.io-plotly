const dotenv = require('dotenv').config()
const assert = require('assert')
const io = require('./app').io

const MongoClient = require('mongodb').MongoClient
const atlasURL = process.env.atlasURL

const client = new MongoClient(atlasURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

  io.on('connection', socket => {
    console.log(`chartPage connected: ${socket.id}`)
  socket.on('disconnect', socket => {
    console.log(`chartPage disconnected!`)
  })
})

  const transmit = packet => {
    io.emit('chartData', packet)
    console.log(`packet emitted: ${packet}`)
  }

  (() => { // IIFE; add test for cursor available
    console.log(`startStream`)
    const changeStream = collection.watch([pipeline], {
      fullDocument: 'updateLookup' })
    changeStream.on('change', document => {
      const packet = []
      packet[0] = document.fullDocument.TimeStamp // could parse from object:_id
      packet[1] = document.fullDocument.Data
      transmit(packet)
    })
  }
  )()
})
