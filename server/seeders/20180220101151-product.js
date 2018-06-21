'use strict';

const faker = require('faker'),
    moment = require('moment'),
    _ = require('lodash'),
    categories = require('../categories');

faker.locale = 'ru';

let products = [];
console.log('creating faker data')
for (let i = 0; i < 50; i++) {
    products.push({
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        title: faker.commerce.productName(),
        short_description: faker.lorem.sentence(7),
        full_description: faker.lorem.paragraph(),
        category: categories[_.random(0, categories.length - 1)].id,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
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

