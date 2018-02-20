'use strict';

const faker = require('faker'),
    moment = require('moment');

faker.locale = 'ru';

let products = [];
console.log('creating faker data')
for (let i = 0; i < 50; i++) {
    products.push({
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    })
}
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('shop_products', products, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('shop_products', null, {});
    }
};

