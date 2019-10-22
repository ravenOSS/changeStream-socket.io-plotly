const dotenv = require('dotenv').config()
const app = require('./app')
const MongoClient = require('mongodb').MongoClient
// const io = require('./socket')
const assert = require('assert')

console.log(`Exported app message(core): ${app.testMessage}`)
console.log(typeof app.testMessage)
console.log(app.transmit)

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
      app.transmit(packet)
    })
  }
  startStream()

  // const transmit = (data) => {
  //   console.log(`packet: ${data}`)
  // }
})

// const transmit = data => {
//   io.emit('serverMsg', data)
// }
// module.exports = { transmit }
