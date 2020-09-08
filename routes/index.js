var express = require('express');
var sqlite3 = require('sqlite3').verbose()
var router = express.Router();

var db = new sqlite3.Database('db.sqlite')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


/* Submitting the form causes this method to run */
router.post('/family', function(req, res, next) {
  // save data to database
  console.log(req.body)  // this is the form data 
  let params =  [req.body.name, req.body.age, req.body.role]
  db.run('INSERT INTO family (name, age, role) VALUES (?, ?, ?)', params, function(err){
    res.redirect('/users/family')
  })
  
})

module.exports = router;
