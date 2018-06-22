'use strict';
let orderProducts = [];
const _ = require('lodash');

for (let i = 1; i < 51; i++) {
    for (let j = 0; j < _.random(1, 20); j++){
        orderProducts.push({
            product_id: _.random(1, 50),
            order_id: i
        })
    } 
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
