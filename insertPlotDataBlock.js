/* This program is for writing a block of data to MongoDB
to test plottable's expandable x-axis timescale
functionality. This is not streaming data
*/

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const moment = require('moment')

const url = 'mongodb://localhost:27017/plotData'

MongoClient.connect(url, function (err, client) {
  assert.strictEqual(null, err)
  console.log('Connected successfully to MongoDB')
  const db = client.db('plottingData')
 
  // Current time
  const now = moment()
  console.log(`Now: ${now.toISOString()}`)
  // Begin time = current time minus a period to create data span
  const begin = now.clone().subtract(1, 'day')
  let step = begin
  console.log(`Begin: ${begin.toISOString()}`)

  while (step <= now) {
    console.log(`New incremental time: ${step.toISOString()}`)
    const data = Math.round(Math.random() * 100)
    console.log(`Random data: ${data}`)
    insertData(db, step.toISOString(), data)
    step = step.add(1, 'hour')
  };
  client.close()
  console.log(`DB Closed`)
})

const insertData = function (db, nowISO, data) {
  // Get the dataStore collection
  const collection = db.collection('plottableTest')
  // Insert data
  collection.insertOne({ TimeStamp: nowISO, Data: data }, function (err, result) {
    assert.strictEqual(err, null)
    assert.strictEqual(1, result.result.n)
    assert.strictEqual(1, result.ops.length)
  })
}
