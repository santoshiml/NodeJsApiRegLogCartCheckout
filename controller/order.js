var express = require('express');
const Order = require('../models').Order;
const Order_item = require('../models').Order_item;
const User = require('../models').User;


/* working but not used bcz already created checkout api in cart controller
async function create_order(req, res){
	//console.log(222, req.user, req.body)
	let user_id = req.user.id 	
	Order.create({
		user_id : req.user.id
	})
		.then(async order => {
			const order_item1 = await order.createOrder_item({product_id:req.body.product_id,				                              quantity:req.body.quantity,price:req.body.price 
			});
			console.log(order_item1)
			res.status(200).json({order_item1})
	  })  
   .catch(error => res.status(400).send(error));
}
module.exports = {create_order} */ 

async function order_list(req, res){

	const profile = await req.user.getProfile()
	const is_admin = profile.is_admin
	let where = {};
	if(!is_admin){
		where.user_id = req.user.id
	}
		order_list = await Order.findAll({where,
		          include:[{
		          	model:User,
		          	as:'user'
		          },
	          	{
		          	model:Order_item,
		          	foreignKey: 'order_id',
		          	as:'order_items'
		          }]
		          
		})
		res.status(200).json({message:'user all orders, all items & user details:',
		                    order_list}) 
}



	//console.log('11', order_list[0].id)
	

module.exports = {order_list}