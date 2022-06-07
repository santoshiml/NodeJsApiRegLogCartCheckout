var express = require('express');
const User = require('../models').User;
const Profile = require('../models').Profile;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
var randomize = require('randomatic');
var crypto = require("crypto");





async function register(req, res){
  let saveUser = req.body
	let errors = []
    if(req.body.Email && req.body.Phone){
      errors.push('From Email or Phone, only one field is required')
    }

    if(!req.body.Email && !req.body.Phone){
      errors.push('From Email or Phone, only one field is required')
    }
    if(!req.body.Password){
      errors.push('Password is required')
    }
    else {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.Password, salt);
      saveUser.Password = hash
    }
    if(req.body.Email){
      const userCheck = await User.findAll({where:{Email: req.body.Email}});
      if(userCheck && userCheck.length > 0){
        errors.push('Enter Unique Email')
      }
      saveUser.Email = req.body.Email
    }
    if(req.body.Phone){
      const userCheck = await User.findAll({where:{Phone: req.body.Phone}});
      if(userCheck && userCheck.length > 0){
        errors.push('Enter Uniuqe Phone')
      }
      saveUser.Phone = req.body.Phone
    }
    if(errors.length > 0){
      res.status(400).json({errors})
    }
    else {
      var user = new User(saveUser);
      await user.save()
      
      await user.createProfile()

      const profile = await user.getProfile()
      let data = {...user.dataValues}
      data.profile = {...profile.dataValues}

      res.status(201).json({data})
    }
}

/* findall all register user's */
const findAll = (req, res) => {
    User.findAll()
    .then(data => {
    console.log(data)
   res.send(data);
   })
   .catch(err => {
    console.log(111,{err})
    res.status(500).send({
    message: "Error retrieving  with id=" + id
    });
    });
};


/* for Login */

function login(req, res){
  var Email = req.body.Email;
  var Password = req.body.Password;
  // console.log(req.body)
  User.findOne({where: {Email: Email}, attributes: ['id','Email','Name','Password']})
    .then(function (data){
      if (!data) {
        res.status(400).json({message:'invalid email'})
      }else{
        const valid_password = bcrypt.compareSync(Password, data.Password);
        if (valid_password){
          const token = jwt.sign({
            data
          }, 'secret', { expiresIn: '1h' });
          res.status(200).json({user:data,token})
        }
        else{
          res.status(400).json({message:"Invalide Password"})
        }
      } 
    }) 
    .catch((error) => {
      console.log(error)
    })
}

/* update my-profile */
function my_profile(req, res){
  try{
    User.findByPk(req.user.id).then(result =>{
      if(!result){
        res.status(400).json({message: 'User not found'})
      }
      else{
        res.status(200).json({message:'User found successfully',profile: result})
      }
    })     
  }
  catch(err) {
    res.status(500).json({err})    
  }
}



/* update profile */
async function update_profile(req,res){
  // try{  
    console.log(req.file)
    if((req.body.Email || req.body.Password)){
      if(!req.body.Current_Password){
        res.status(400).json({message: "Current Password filed is required"})
      }
    }
    
    let user = await User.findOne({where: {id : req.user.id }})

    if(req.body.Current_Password && !bcrypt.compareSync(req.body.Current_Password,user.Password)){
      res.status(400).json({message: "Current Password is Invalid"})
    }
    else {
      if(req.body.Name){
        user.Name = req.body.Name
      }
      if(req.body.Email){
        user.Email = req.body.Email
      }
      if(req.body.Phone){
        user.Phone = req.body.Phone
      }
      if(req.body.Age){
        user.Age = req.body.Age
      }
      if(req.body.Password){
        var salt =  bcrypt.genSaltSync(10);   
        var hash = bcrypt.hashSync(req.body.Password, salt);
        user.Password = hash
      }

      if(req.file){
        console.log('333',req.file) // profile_name,imagename(abc.jpg),  
        const profile = await req.user.getProfile();
        profile.image = req.file.path
        await profile.save()
      }

       await user.save()
    res.status(200).json({user})  
    }
}    

  //}
  // catch(err){
  //   res.status(400).json({message:"Not updated user profile", err})
  // } 
//}



async function forgot_passwort(req, res){
  let user_data = await User.findOne({where:{Email:req.body.Email}});
  
  if(user_data){

    var val = Math.floor(100000 + Math.random() * 9000);
  
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2de6fc0a47a3a7",
        pass: "edec825d10eb61"
      }
      });
    
    let info = await transport.sendMail({

      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: user_data.Email, // list of receivers
      subject: "Forgot Password", // Subject line
      html: "<b> Dear</b> "+user_data.Email+"<br><br>Please click the following link: "+req.headers.host+"<br><br>Your token is: "+val+
      "<br><br>Thank You!", // html body
    });

   
  let update_token = await User.update({reset_password_token:val}, {where:{Email:req.body.Email}})

  res.status(200).json({message:'Forgot Password', user_data})

  }else{
    res.status(400).json({message:'Email Not found, Please check your enter email'})
  }
}


/* Passowrd Reset API */
async function reset_password(req, res){

  if(req.body.Email && req.body.reset_password_token){
    var user_info = await User.findOne({
      where:{
        Email:req.body.Email
      }
    });
    if(user_info){
      console.log("matched email",user_info)
      if(user_info.Email && user_info.reset_password_token){
        var salt =  bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.Password, salt);

        let update_password = await User.update({
          Password:hash,
          reset_password_token:null
        },
        { 
          where:{
            Email:req.body.Email,
            reset_password_token:req.body.reset_password_token
          }
        })
       
        if(update_password[0]){
          res.status(200).json({message:"Password has beed updated", update_password})
        }else{
          res.status(400).json({message:"Password not updated",update_password})
        }
      }
    }
  }else{
    res.status(400).json({message:'Please Enter a Email & token'})
  }
}



async function forgot_password_link(req,res){
  let user_data = await User.findOne({
    where:{
      Email:req.body.Email
    }
  });
  
  if(user_data){

    var val = crypto.randomBytes(30).toString('hex');
    var link = `http://localhost:4000/reset-password-page-link/${val}`
  
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2de6fc0a47a3a7",
        pass: "edec825d10eb61"
      }
      });
    
    let info = await transport.sendMail({

      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: user_data.Email, // list of receivers
      subject: "Forgot Password", // Subject line
      html: `<b>Dear</b> 
            ${user_data.Email}<br><br>
            Please click the following link: <br><br>
            <a href=${link}>Click Here</a>
            <br><br>
            Thank You!`, // html body
    });
    user_data.link_token = val
    let update_token = await user_data.save()

  res.status(200).json({message:'Forgot Password',update_token, user_data})

  }else{
    res.status(400).json({message:'Email Not found, Please check your enter email'})
  }
}



/* Passowrd Reset API */
async function reset_password_page_link(req, res){
  if(req.params.token){
    var user_info = await User.findOne({
      where:{
        link_token:req.params.token
      }
    });
    if(user_info){
      res.render('reset-password', {user_info})      
    }
    else {
      res.status(400).json({message:'Link is malformed 1'})  
    }
  }else{
    res.status(400).json({message:'Link is malformed'})
  }
}



/* Passowrd Reset API */
async function reset_password_link(req, res){
  res.render('success')
  if(req.body.Email && req.body.link_token){
    var user_info = await User.findOne({
      where:{
        Email:req.body.Email
      }
    });
    if(user_info){
      //console.log("matched email",user_info)
      if(user_info.Email && user_info.link_token){
        var salt =  bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.Password, salt);

        let update_password = await User.update({
          Password:hash,
          link_token:null
        },
        { 
          where:{
            Email:req.body.Email,
            link_token:req.body.link_token
          }
        })
       
        if(update_password[0]){
          res.render('success')

          //res.status(200).json({message:"Password has beed updated", update_password})
        }else{
          res.render('fail.ejs')

          //res.status(400).json({message:"Password not updated",update_password})
        }
      }
    }
  }else{
    res.status(400).json({message:'Please Enter a Email & token'})
  }
}


module.exports = {register,login, 
               my_profile, 
               update_profile, 
               forgot_passwort, 
               findAll, 
               reset_password,
               forgot_password_link, 
               reset_password_page_link, 
               reset_password_link}