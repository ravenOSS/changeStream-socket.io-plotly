var express = require('express')
var router = express.Router()
const path = require('path')

/* GET index page. */
const options = {
  root: path.join(__dirname, '../views')
}

/* GET home page. */
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
// Use sendFile for .html
// Add path.join and provide root dir
// solves the page load but is using a default
// of index.html (requires 'path')
// Two routes will serve the same file.
// Using express.static with options does render the default
// index.html. Probably NOT correct.
