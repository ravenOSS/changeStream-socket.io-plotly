var express = require('express')
var router = express.Router()
const path = require('path')

/* GET chart page. */
const options = {
  root: path.join(__dirname, '../pages')
}

/* GET chart page. */
router.get('/', (req, res) => {
  res.sendFile('plotlyChart.html', options, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`Sent: chart`)
    }
  })
})

module.exports = router
