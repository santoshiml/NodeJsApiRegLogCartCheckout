'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      image: {
        type: Sequelize.STRING
      },
      tags:{
        type:Sequelize.ARRAY(Sequelize.STRING)
      },
      status:{
        type: Sequelize.ENUM('active','block','suspended'),
        defaultValue: 'active'
      },
      is_admin:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      last_login:{
        type:Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Profiles');
  }
};