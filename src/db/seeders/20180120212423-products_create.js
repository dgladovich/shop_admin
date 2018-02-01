'use strict';
let Chance = require('chance');
let chance = new Chance;
module.exports = {
    up: (queryInterface, Sequelize) => {
        let products = [];

        for (let i = 0; i < 100; i++) {
            products.push({
                name: chance.animal(),
                price: chance.random(),
                createdAt: chance.date(),
                updatedAt: chance.date(),
            })
        }
        return queryInterface.bulkInsert('shop_products', products, {});
    },

    down: (queryInterface, Sequelize) => {
          return queryInterface.bulkDelete('shop_products', null, {});
    }
};
