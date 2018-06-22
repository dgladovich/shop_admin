'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('shop_orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            delivery_date: {
                type: Sequelize.DATE
            },
            address: {
                type: Sequelize.STRING
            },
            delivery_service: {
                type: Sequelize.INTEGER
            },
            payment: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING
            },
            total_price: {
                type: Sequelize.FLOAT
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
        return queryInterface.dropTable('shop_orders');
    }
};