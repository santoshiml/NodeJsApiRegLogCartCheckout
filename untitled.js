/*var Cart = require('../models').Cart;
//var Cart_items = require('../models').Cart_items
var Cart_items = require('../models').Cart_items

async function create_cart(req, res){
	var user_id = req.user.id;
   Cart.findOne({where:{user_id:req.user.id}})
   .then(async items_create => {

   	console.log('111',items_create)

		  if(items_create ==null){
		 	  Cart.create({
					user_id : req.user.id
			  })

    	  

    	//   	const items = await Cart_items.create({
					// 	cart_id: cart_create.id,
					// 	product_id:req.body.product_id,
					// 	quantity:req.body.quantity 
					// })
					// 	console.log('222',items)
  
		
		  }else{

  			const createcart_items = await Cart_items.create({
															      		cart_id:items_create.id,
																	   		product_id:req.body.product_id,
																	   		quantity:req.body.quantity
				                                })		
		    }

		res.status(200).json({message:'cart & items are create', /*items, createcart_items*/})   
   /* })


//     .catch(err =>{
//     	res.status(500).send(err)
//     })
}



module.exports = {create_cart}









.then(async items_create => {
   	1. {
	   		id,user_id
	   	}

   console.log('cart :id with user_id', items_create)


   		const createcart_items = await Cart_items.create({
   			                  cart_id:items_create.id,
										   		product_id:req.body.product_id,
										   		quantity:req.body.quantity,
													})


  //if(items_create ){

  //}
  

 	  //const item_create1 = await items_create.getCart_items()

 	  res.status(200).json({message:'items created',items_create,createcart_items})   
    }) 

   //.catch(err => {res.status(500).send(err)}) 


	Cart.create({
		user_id : req.user.id
	})
    .then(async cart_create => {
    	const items = await Cart_items.create({
				cart_id: cart_create.id,
				product_id:req.body.product_id,
				quantity:req.body.quantity 
		})

  // res.status(200).json({message:'cart created', cart_create, items})

    })

  // .catch(err => {res.status(500).send(err)})
}


module.exports = {create_cart} */