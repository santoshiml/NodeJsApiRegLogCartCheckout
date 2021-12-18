'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.belongsToMany(models.Category, {
        through:'Product_Category',
        as:'categories',
        foreignKey:'product_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      models.Category.belongsToMany(models.Product, {
        through:'Product_Category',
        as:'products',
        foreignKey:'category_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      
   




    }
  };
  Product_Category.init({
    product_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_Category',
  });
  return Product_Category;
};