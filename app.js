const path = require('path')
const express = require('express')
const app = express()
const port = 3500

var indexRouter = require('./routes/index')
var chartRouter = require('./routes/chart')

app.use(express.static(path.join(__dirname, 'views')))
// app.set('view engine', 'html')

app.use('/', indexRouter)
app.use('/chart', chartRouter)

// app.get('/', (req, res) => res.send('Hello Colorado'))
// app.get('/chart', (req, res) => res.render('index.html'))

app.listen(port, () => console.log(`Server listening on port ${port}`))
