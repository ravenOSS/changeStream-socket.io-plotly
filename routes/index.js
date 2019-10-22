var express = require('express')
var router = express.Router()
const path = require('path')

const options = {
  root: path.join(__dirname, '../views')
}

/* GET index page. */
router.get('/', (req, res, next) => {
  res.sendFile('index.html', options, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`Sent: index`)
    }
  })
})

module.exports = router
