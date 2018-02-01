'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shop_orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE
      },
      delivey_date: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING
      },
      delivery_service: {
        type: Sequelize.STRING
      },
      payment: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      total_price: {
        type: Sequelize.FLOAT
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shop_orders');
  }
};