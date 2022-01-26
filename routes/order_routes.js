let createError = require('http-errors');
let express = require('express');
const { render } = require('../app');
let sqlite3 = require('sqlite3').verbose()
let router = express.Router();

let db = new sqlite3.Database('db.sqlite')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('enter_order_form');
});


/* POST saves new order. Submitting the form causes this method to run */
router.post('/place-order', function(req, res, next) {
  
  console.log(req.body)  // this is the form data - note the names from the form elements are used to label the data
  
  // save data to database
  // very important thing that's missing and that should be added - validation!
  let params =  [req.body.name, req.body.product, req.body.quantity]
  db.run('INSERT INTO orders (name, product, quantity) VALUES (?, ?, ?)', params, function(err){
    res.redirect('/order-list')
  })
  
})

/* GET orders list. */
router.get('/order-list', function(req, res, next) {

  db.all("SELECT * FROM orders", function(err, orders) {   //  get all matching rows for the query
    console.log(err, orders)
    res.render('order_list', { orders: orders });
  })

})

/* GET order edit page. Find order to edit in the database, 
create a page with a form already populated with that order's information */
router.get('/edit/:id', function(req, res, next) {
  let orderId = req.params.id
  db.get("SELECT * FROM orders WHERE id = ?", orderId, function(err, order) {  // get first matching row - selecting by primary key so expect 1 or none.
    if (!order) {
      return next(createError(404, 'Order not found'));
    } 
    res.render('edit_order_form', {order: order})
  })
})


/* POST edit an order */
router.post('/edit-order', function(req, res, next) {

  console.log(req.body)  // this is the form data,
  //note the names from the form elements are used to label the data, and the hidden element is included too 
  
  db.run('UPDATE orders SET name = ?, product = ?, quantity = ? WHERE id = ?', 
  [req.body.name, req.body.product, req.body.quantity, req.body.id], function(err) {
    // Redirect to the order list page 
    return res.redirect('/order-list')
    // TODO as with all the other database routes, validation, and error handling
  })

})

router.get('/clear-orders', function(req, res, next) {
  return res.render('delete_orders')
})


router.post('/clear-orders', function(req, res, next) {
  db.run('DELETE FROM orders', function(err, order) {
    return res.redirect('/')
  })
})

module.exports = router;
