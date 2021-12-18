'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasOne(models.Profile, {
        foreignKey: 'user_id',
        as: 'profile',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      User.hasOne(models.Cart, {
        foreignKey: 'user_id',
        as: 'cart',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });


      User.hasMany(models.Order, {
        as: 'orders',
        foreignKey:'user_id'

      })
   
    }
  };
  User.init({
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    Phone: DataTypes.INTEGER,
    Age: DataTypes.INTEGER,
    reset_password_token:DataTypes.INTEGER,
    link_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};