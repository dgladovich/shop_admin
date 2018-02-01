'use strict';
let Chance = require('chance');
let chance = new Chance;

module.exports = {
  up: (queryInterface, Sequelize) => {
      let users = [];
      for(let i = 0; i< 100; i++){
        users.push({
            name: chance.name(),
            age: chance.age(),
            createdAt: chance.date(),
            updatedAt: chance.date(),
        })
      }
      return queryInterface.bulkInsert('shop_users', users, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('shop_users', null, {});
  }
};