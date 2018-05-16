'use strict';
const faker = require( 'faker');
const _ = require( 'lodash');
let tableName = 'shop_visits';
module.exports = {
    up: (queryInterface, Sequelize) => {
        let visits = [];
        for(let i = 0; i < 100000; i++){
            visits.push({
                user_id: _.random(10000, 1000000),
                created_at: faker.date.between('2017-01-01', '2017-12-31')
            })
        }

        return queryInterface.bulkInsert(tableName, visits, {});
    },

    down: (queryInterface, Sequelize) => {
          return queryInterface.bulkDelete(tableName, null, {});
    }
};
