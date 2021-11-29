var express = require('express');
var router = express.Router();
const User = require('../models').User;
var register = require('../controller/auth.js')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {register, login, my_profile, update_profile} = require('../controller/auth')
var router = express.Router()


var token_verification = function (req, res, next1) {
  try{
    const decoded = jwt.verify(req.header('Authorization'), 'secret');
    req.user = decoded.data
  }
  catch(err){
   // res.status(400).json({message:"Token Expaire", err})
  } 
  next1()
}


/* Register Api working */
router.post('/reg',  register)

/* Login Api */ 
router.post('/login', login ) 

/* Retrive or my-profile api */ 
router.get('/my-profile',token_verification, my_profile)


/* Update profile APi */ 

router.put('/update-profile',token_verification, update_profile)


module.exports = router;
