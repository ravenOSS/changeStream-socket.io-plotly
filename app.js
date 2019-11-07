const express = require('express')
const path = require('path')
const logger = require('morgan')

const app = express()
const port = 3300

app.use(logger('dev'))

app.use(express.static('views'))
app.use(express.static('js'))

const server = require('http').createServer(app)
const io = require('socket.io')(server)
// note that socket is attached to server not app

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`Server listening on port ${port}`))

module.exports = { io } // export socket instance
