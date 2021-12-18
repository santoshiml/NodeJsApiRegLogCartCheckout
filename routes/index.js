var express = require('express');
var router = express.Router();
const User = require('../models').User;
var register = require('../controller/auth.js')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {register, findAll, login, my_profile, update_profile, forgot_passwort,
  reset_password,forgot_password_link, 
  reset_password_page_link,reset_password_link} = require('../controller/auth')

var {create_category} = require('../controller/category')
var {create_product, read_product, delete_product, update_product, find_one_product} = require('../controller/product')
//var {create_order} = require('../controller/order')
var {order_list} = require('../controller/order')

var {create_cart, cart_delete, checkout} = require('../controller/cart')

var router = express.Router()

const multer  = require('multer')  // for Image store in database 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },

  filename: function (req, file, cb) {
    //console.log('ssss',file.originalname.split('.')[1])

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1])
  }
})


const upload = multer({ storage: storage })


var token_verification = async function (req, res, next1) {
  try{
    const decoded = jwt.verify(req.header('Authorization'), 'secret');
    const user = await User.findByPk(decoded.data.id)
    req.user = user
  }
  catch(err){
    res.status(400).json({message:"Token Expaire", err})
  } 
  next1()
}


/* Register Api working */
router.post('/reg',  register)

router.get('/find-all', findAll)

/* Login Api */ 
router.post('/login', login ) 

router.post('/forgot-password', forgot_passwort)


/* Using url & Link */
router.post('/forgot-password-link', forgot_password_link)

router.get('/reset-password-page-link/:token', reset_password_page_link)

router.post('/reset-password-link' , reset_password_link)
// above routes for reset password with link



router.post('/reset-password', reset_password)

//router.post('/forgot-password-gmail',forgot_passwort_gmail)

router.get('/my-profile',token_verification, my_profile)

router.put('/update-profile',upload.single('image'), token_verification,update_profile)

// many to many association 
router.post('/category-api', create_category)

router.post('/product-api', create_product)

router.get('/product-read', read_product)

router.delete('/product-delete/:id', delete_product)

router.put('/product-update', update_product)

router.get('/product-one-read/:id', find_one_product)

router.post('/product-get', find_one_product )

// One to many association between order & order_items table & already created a 
//checkout api so that we can fisrt oder create so no need to run this api 
//router.post('/order-create-api', token_verification, create_order)

router.post('/order-list-api', token_verification, order_list)


// One to many association between cart & cart_items table 
router.post('/create-cart',token_verification, create_cart)

// one to many association between cart & delete 
router.delete('/deleted-cart',token_verification,cart_delete)
// one to many Association if not have order in cart created first & then checkout. 
router.post('/checkout-cart', token_verification, checkout)


module.exports = router;
