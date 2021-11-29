var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config/config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Sequelize = require('sequelize'); 
const bodyParser = require('body-parser');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var url = "postgres://postgres:123456@localhost:5432/new_to_do";

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const sequelize = new Sequelize(url, config)
// const sequelize = new Sequelize(url);
sequelize
  .authenticate()
  .then(() => {
    console.log('sequelize Connection done');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  //sequelize.sync({ force: true })



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// write code here for run localhost:3000 port 
app.get('/', function(req, res){
  res.send("Server connection save!")  
})
app.listen(3000, function(){
  console.log('Connection done with port 3000')
});


module.exports = app;
