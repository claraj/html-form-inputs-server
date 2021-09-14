let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let hbs = require('hbs')
let handlebarsHelpers = require('./helper')

let indexRouter = require('./routes/order_routes')

let sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('db.sqlite')

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS orders (id integer primary key autoincrement, name TEXT, product TEXT, quantity NUMBER)', function(err) {
    console.log(err || 'table created')
  })
})

db.close()

let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))

hbs.registerHelper(handlebarsHelpers)
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
