'use strict';
let faker = require('faker');
let moment = require('moment');
let _ = require('lodash');
let orders = [];
let orderProducts = [];
let users = [1, 2, 3];
let deliveryServices  = [1, 2, 3, 4];
let payment_types = [1, 2, 3, 4];

for(let i = 0; i < 50; i++){
  orders.push({
      user_id: users[_.random(0,2)],
      delivery_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      address: faker.address.streetAddress(),
      delivery_service: deliveryServices[_.random(0, 3)],
      payment: payment_types[_.random(0, 3)],
      status: 'pending',
      total_price: faker.commerce.price()

  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('shop_orders', orders, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
