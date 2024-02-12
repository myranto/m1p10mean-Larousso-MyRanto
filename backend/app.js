var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const crypto = require('crypto');
var cors = require('cors');
require('dotenv').config();
require('./db')
// const TOKEN_SECRET = crypto.randomBytes(64).toString('hex')

// process.env.TOKEN_SECRET = TOKEN_SECRET
// console.log(process.env.TOKEN_SECRET);
var serviceRouter = require('./routes/service');
var typeCostRouter = require('./routes/type_cost');
const userRouter = require('./routes/person/User');
const discountRouter  = require('./routes/discount/discount');
const appointment = require('./routes/appointment');

var app = express();
const { authenticateToken } = require('./jwt');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authenticateToken)
app.use('/service', serviceRouter);
app.use('/type_cost',typeCostRouter);
app.use('/user',userRouter)
app.use('/discount',discountRouter);
app.use('/appointment',appointment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
