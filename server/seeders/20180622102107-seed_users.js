'use strict';
let users = [];
let faker = require('faker');
let _ = require('lodash');

for(let i = 0; i < 2; i++){
    users.push({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        phone_number: faker.phone.phone(),
        age: _.random(18, 40),
        active: true
    })
}
module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Person', users, {});
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
