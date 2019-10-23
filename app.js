const express = require('express')

// const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const plotlyChartRouter = require('./routes/plotlyChart')

const app = express()
const port = 3300

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/plotlyChart', plotlyChartRouter)

const server = require('http').createServer(app)
const io = require('socket.io')(server)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Server listening on port ${port}`))

const testMessage = 'App.js here!'

module.exports = { io, testMessage }
require('./changeStreamCore') // note exports need to be defined before changestream
// otherwise you'll get io not defined error
// Create file to pull in modules in correct order??
