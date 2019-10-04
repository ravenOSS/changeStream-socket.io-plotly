var express = require('express')
var router = express.Router()

/* GET chart page. */
router.get('/chart', function (req, res, next) {
  res.render('chart')
  // res.render('index', { title: 'Express' })
})

module.exports = router
