'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('shop_users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            phone_number: {
                type: Sequelize.STRING
            },
            age: {
                type: Sequelize.INTEGER
            },
            active: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()'),
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()'),
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('shop_users');
    }
};