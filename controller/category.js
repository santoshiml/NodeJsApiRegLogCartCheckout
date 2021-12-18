const Category = require('../models').Category;


async function create_category(req, res){
	console.log('hello1')
	  Category
	  .create({
			Brand:req.body.Brand,
			Color:req.body.Color
    })
	.then(category => {
		console.log('hello2')
		console.log(category)
		res.status(200).json({message:'create category'})
	})
	.catch(error => res.status(400).send(error));
}



module.exports = {create_category}

