'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'reset_password_token', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
      ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.removeColumn('Users', 'reset_password_token'),
    ]);



  }
};
