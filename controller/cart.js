var Cart = require('../models').Cart;
//var Cart_items = require('../models').Cart_items
var Cart_items = require('../models').Cart_items;

var Order = require('../models').Order;

var Order_item = require('../models').Order_item;

var Product = require('../models').Product;

/* code written by me & it's working for create cart & cart items */
/*
async function create_cart(req, res){
	var user_id = req.user.id;
	//var cart_id =req.Cart.id

  Cart.findOne({where:{user_id:req.user.id}})
   .then(async items_create => {
		  // if(items_create == null){
		  if(!items_create){
		 	  const cart1 = await Cart.create({
					user_id : req.user.id
			  })

    	  const items = await Cart_items.create({
					cart_id: cart1.id,
					//cart_id: items.id,
					product_id:req.body.product_id,
					quantity:req.body.quantity 
				})
		    res.status(200).json({message:'New cart has been created with cart items',items}) 
		  }else{
  			const createcart_items = await Cart_items.create({
      		cart_id:items_create.id,
		   		product_id:req.body.product_id,
		   		quantity:req.body.quantity
        })
				res.status(200).json({message:'Items are added into cart',createcart_items})                                 		
		  }  
    })
//     .catch(err =>{
//     	res.status(500).send(err)
//     })
}
*/

/*  written by sir working for creat cart & cart items. */
/*async function create_cart(req, res){
	var cart = await req.user.getCart()
	if(!cart){
 	  cart = await Cart.create({
			user_id : req.user.id
	  })
  }
	const items = await Cart_items.create({
		cart_id:cart.id,
 		product_id:req.body.product_id,
 		quantity:req.body.quantity
  }) 

	res.status(200).json({message:'Items are added into cart', cart, items})
 } */

/* only increase item quantity not create items again & again */


async function create_cart(req, res){
 	var product_id = req.body.product_id;
 	var quantity = req.body.quantity

	var cart = await req.user.getCart()
	
	if(!cart){
 	  cart = await Cart.create({
			user_id : req.user.id
	  })
  }

		const cart_item_data = await Cart_items.findOne(
			                    {where:{cart_id:cart.id, product_id:req.body.product_id}})
	
	  if(cart_item_data){
	  	cart_item_data.quantity = cart_item_data.quantity + req.body.quantity
	  	await cart_item_data.save();
	  }
	  else{
	  	const items = await Cart_items.create({
			  cart_id:cart.id,
				product_id:req.body.product_id,
				quantity:req.body.quantity
			}) 
	  }

    // const quant_inc = await Cart_items.update({quantity:req.body.quantity},
  	 //               {where:{cart_id:cart.id, product_id:req.body.product_id}})

   //  if(quant_inc && quant_inc[0] === 0){
			// const items = await Cart_items.create({
			//   cart_id:cart.id,
			// 	product_id:req.body.product_id,
			// 	quantity:req.body.quantity
			// }) 
   //  }
  
		res.status(200).json({message:'Items are added into cart', cart})
 }


async function cart_delete(req, res){
	const cart = await req.user.getCart()
	if(cart){
		const items = await cart.getItems()
		
		await Cart_items.destroy({where:{id:req.body.id} })		
		if(items.length == 1){
			await cart.destroy()
		}

	 	res.status(200).json({message:'cart deleted'})
	}else{
	  res.status(400).json({message:'User don"t have cart'})

	}
}


async function checkout(req, res){

	// check cart if available by findOne  
	// if user's have cart then  
// store data with order, order items & delete cart & cart items  
// else return 400 cart not found 


var user_id = req.user.id;
	let checkout = await Cart.findOne({where:{user_id : req.user.id},
		   include:{
					   	model:Cart_items,
					   	as:'items'	   	
		   },
  })

	if(!checkout){
		res.status(400).json({message:'Cart not found', checkout})

	}else{

		const checkoutData = await Order.create({user_id:req.user.id})
	
		for(let item of checkout.items){

			debugger

			const product = await Product.findByPk(item.product_id);

			const add_items = await Order_item.create({
				order_id:checkoutData.id,
				product_id:item.product_id,
				quantity:item.quantity,
				price:product.Price

			})
			await item.destroy()
    }

	  const checkout_dsty = await Cart.destroy({where:{user_id:req.user.id}})

		res.status(200).json({message:'Order created successfully', checkoutData, checkout_dsty}) 
	}
}

module.exports = {create_cart,cart_delete, checkout}
