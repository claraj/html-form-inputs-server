var express = require('express');
var sqlite3 = require('sqlite3').verbose()
var router = express.Router();

var db = new sqlite3.Database('db.sqlite')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/family', function(req, res, next) {
  // save 
  console.log(req.body)
  let params =  [req.body.name, req.body.age, req.body.role]
  db.run('INSERT INTO family (name, age, role) VALUES (?, ?, ?)', params, function(err){
    res.redirect('/users/family')
  })
  
})

module.exports = router;
