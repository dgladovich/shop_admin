'use strict';
let categories = require('../categories');
module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('shop_categories', categories, {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('shop_categories', null, {});
  }
};
