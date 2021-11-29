var express = require('express');
const User = require('../models').User;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const email_validation = require('express-validator');
//var Sequelize = require('sequelize-isunique-validator')(Sequelize);



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
      user = await user.save()
      res.status(201).json({user})
    }
}



/* for Login */

function login(req, res){
  var Email = req.body.Email;
  var Password = req.body.Password;
  // console.log(req.body)
  User.findOne({where: {Email: Email}, attributes: ['id','Email', 'Name', 'Password']})
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


async function update_profile(req,res){
  try{  
    if((req.body.Email || req.body.Password)){
      if(!req.body.Current_Password){
        res.status(400).json({message: "Current Password filed is required"})
      }
    }
    let user = await User.findOne({where: {id : req.user.id }})
    if(req.body.Current_Password && !bcrypt.compareSync(req.body.Current_Password, user.Password)){
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
      await user.save()
      res.status(200).json({user})
    }
  }
  catch(err){
    res.status(400).json({message:"Not updated user profile", err})
  } 
}



// sync function update_profile(req,res){
//   try{
    
//     if((req.body.Email || req.body.Password)){
//       if(!req.body.Current_Password){
//         res.status(400).json({message: "Current Password filed is required"})
//       }
//     }
//     let user = await User.findOne({where: {id : decoded.data.id }})
//     if(req.body.Current_Password && !bcrypt.compareSync(req.body.Current_Password, user.Password)){
//       res.status(400).json({message: "Current Password is Invalid"})
//     }
//     else {
//       if(req.body.Name){
//         user.Name = req.body.Name
//       }
//       if(req.body.Email){
//         user.Email = req.body.Email
//       }
//       if(req.body.Phone){
//         user.Phone = req.body.Phone
//       }
//       if(req.body.Age){
//         user.Age = req.body.Age
//       }
//       if(req.body.Password){
//         var salt =  bcrypt.genSaltSync(10);   
//         var hash = bcrypt.hashSync(req.body.Password, salt);
//         user.Password = hash
//       }
//       await user.save()

//       res.status(200).json({user})
//     }
//   }
//   catch(err){
//     res.status(400).json({message:"Not updated user profile", err})
//   } 
// }






module.exports = {register,login, my_profile, update_profile}