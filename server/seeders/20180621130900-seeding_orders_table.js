'use strict';
let orders = [];
let orderProducts = [];
let users = [1, 2, 3];

for(let i = 0; i < 50; i++){
  orders.push({
      user_id: users[_.random(0,2)],
      delivery_date: moment.format('YYYY-MM-DD HH:mm:ss'),
      address:
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
