var express = require('express');
var sqlite3 = require('sqlite3').verbose()
var router = express.Router();

var db = new sqlite3.Database('db.sqlite')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});


/* POST saves new order. Submitting the form causes this method to run */
router.post('/place-order', function(req, res, next) {
  
  console.log(req.body)  // this is the form data 
  
  // save data to database
  // very important thing to add here - validation!
  let params =  [req.body.name, req.body.product, req.body.quantity]
  db.run('INSERT INTO orders (name, product, quantity) VALUES (?, ?, ?)', params, function(err){
    res.redirect('/order-list')
  })
  
})

/* GET orders list. */
router.get('/order-list', function(req, res, next) {

  db.all("SELECT * from orders", function(err, orders) {
    console.log(err, orders)
    res.render('order_list', { orders: orders });
  })

});

module.exports = router;
