'use strict';
let orderProducts = [];
const _ = require('lodash');

for (let i = 0; i < 500; i++) {
    orderProducts.push({
        product_id: _.random(1, 50),
        order_id: _.random(1, 50)
    })
}
module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('shop_order_products', orderProducts, {});

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
