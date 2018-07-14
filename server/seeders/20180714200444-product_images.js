'use strict';
let faker = require('faker');
let _ = require('lodash');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let images = [];
    for (let i = 0; i < 50; i++) {
      let iq = _.random(0, 9);
      for(let j = 0; j < iq; j++){
        images.push({
          title: faker.lorem.word(),
          product_id: i + 1,
          src: faker.image.technics(),
          main: j === 0
        })

      }

    }

    return queryInterface.bulkInsert('shop_product_images', images, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('shop_product_images', null, {});
  }
};
