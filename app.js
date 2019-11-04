const express = require('express')
const path = require('path')
const logger = require('morgan')

const app = express()
const port = 3300

app.use(logger('dev'))

/* chart page options */
const options = {
  root: path.join(__dirname, './views')
}

/* GET chart page. */
app.get('/', (req, res) => {
  res.sendFile('./plotlyChart.html', options, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`Sent: chart`)
    }
  })
})

const server = require('http').createServer(app)
const io = require('socket.io')(server)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Server listening on port ${port}`))

module.exports = { io } // export socket instance
