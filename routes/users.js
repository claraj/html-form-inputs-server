var express = require('express');
var sqlite3 = require('sqlite3').verbose()
var router = express.Router();

var db = new sqlite3.Database('db.sqlite')

/* GET users listing. */
router.get('/family', function(req, res, next) {

  db.all("SELECT * from family", function(err, all) {
    console.log(err, all)
    res.render('family', {people: all});
  })

});

module.exports = router;
