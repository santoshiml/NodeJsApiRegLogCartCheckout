'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here

      Profile.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

    }
  };
  Profile.init({
    user_id: DataTypes.INTEGER,
    image: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    status:DataTypes.ENUM('active','block','suspended'),
    is_admin:DataTypes.BOOLEAN,
    last_login:DataTypes.DATE,

  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};