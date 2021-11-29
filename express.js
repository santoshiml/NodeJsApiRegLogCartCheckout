
// const http = require('http');
// const server = http.createServer(requestListener);

// var router = express.Router()
// const requestListener = function (req, res) {
//   res.writeHead(200);
//   res.end('Hello, World!');
// }


// // router.get('/home', function (req, res) {
// //   res.send('Hello World!')
// // })


// // router.get('/test-middleware', function (req, res) {
// //   res.send('test-middleware@!!!!!!!')
// // })


// app.get('/user/:id', function (req, res, next) {
//   console.log('ID:')
//   next()
// }, function (req, res, next) {
//   res.send('User Info')
// })


/* It's working 
const express = require('express')
const app = express()

app.get('/home', function(res, res){
	
})

app.listen(3000, function(){
	console.log('server connection done')
})

*/ 
const express = require('express')
const app = express()

app.get('/about', (req, res) => {
	res.send('about page')
})
app.get('/contactus', (req, res) => {
	res.send('contact_us page')
})
app.listen(3000, function(){
	console.log('server connection done')
});

app.get('/my-profile/:id', function (req, res, next) {

  console.log('user id page', req.params.id)
  next()
}, function (req, res, next) {
  res.send('User Info')

})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id/one', function (req, res, next) {
  res.send('user info')
})


// return first route information while pass req.params.id===0 
// app.get('/user/:id', function (req, res, next) {
//   // if the user ID is 0, skip to the next route
//   if (req.params.id === '0') next('route')

//   // otherwise pass the control to the next middleware function in this stack
//   else next()

// }, function (req, res, next) {
//   // send a regular response
//   res.send('regular')
// })

// // handler for the /user/:id path, which sends a special response
// app.get('/user/:id', function (req, res, next) {
//   res.send('special')
// })

// two function with one variable 
function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

var logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, function (req, res, next) {
  res.send('User Info')
})


app.get('/plantae/:genus.:species', function (req, res) {
  res.send(req.params)
})

//tagid=1234
app.get('/my_profile', function(req, res){
	res.send(req.query)
})

app.get('/user/:id', function(req, res){
	res.send(req.params.id)
})

