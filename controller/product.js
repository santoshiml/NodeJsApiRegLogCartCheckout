var express = require('express');
const Product = require('../models').Product;
const Category = require('../models').Category;
const { Op } = require("sequelize");  // Op is Operator 


// Insert Data using category Id 
async function create_product(req, res){
	  Product
	  .create({
			Name:req.body.Name,
			Price:req.body.Price
    })
	.then(async(product) => {

		//const category = await Category.findByPk(req.body.CategoryId) 
		// category = {}
		// await category.addProduct(product)

		//const category = await Category.findAll({where: {id: {[Op.in]: req.body.CategoryId } }})

		const category = await Category.findAll({where: {id: {[Op.in]: req.body.CategoryId } }})
		// category = [{},{}]
		
		await product.addCategory(category)

		const cats = await product.getCategories()
		// let data = {...product.dataValues}	
		// data.categories = await {...cats.dataValues}
		// console.log(111, cats)
		res.status(200).json({product, cats})
	})
	// .catch(error => res.status(400).send(error));
}


async function read_product(req, res){
	Product.findAll({ 
		include: {
            model: Category,
            as:'categories'
        }
	})
	.then(data =>{
		//console.log(data)
		res.status(200).send(data);
	})
	.catch(err => {
		res.status(500).send({message:'Not Retrive data'})
	})
}

//Delete association 
async function delete_product(req, res){
	Product.destroy({ where:{id:req.params.id}})
	.then(result => {
		console.log(result)
		// res.status(200).send(result)

		res.status(200).json({result});
	})
	.catch(err => {
		res.status(400).send({message:'Not Deleted Data',err})
	})
}

// Update Association
async function update_product(req, res){
	const updatevalue = { Name:req.body.Name, Price:req.body.Price}
	Product.update(updatevalue, {where:{id:req.body.id}})
	.then(result =>{
		if(req.body.CategoryId){
			Product.findByPk(req.body.id)
						.then((product) => {
							// product.setCategories(req.body.CategoryId)
							product.addCategories(req.body.CategoryId)
									.then((result) => {
										res.status(200).json({product, result, mes:'1'});
									})
						})
		}
		else {
			res.status(200).json({result});	
		}	
	})
	.catch(err => {
		res.status(400).send({message:'Not Updated Data', err})
	})
}


//findone Api 

async function find_one_product(req, res){
	// const id = req.params.id;
	const id = req.body.id;
	Product.findByPk(id, {
		include:{
            model: Category,
            as:'categories'
           }
	  })
  .then(data =>{
 		console.log(data)
		res.status(200).send(data);
	})
	.catch(err => {
		res.status(500).send({message:'Data not retrive'})
	})
}



module.exports = {create_product, read_product, delete_product, update_product, find_one_product}




