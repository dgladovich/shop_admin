'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('shop_products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            short_description: {
                type: Sequelize.TEXT
            },
            category: {
                type: Sequelize.INTEGER
            },
            full_description: {
                type: Sequelize.TEXT
            },
            price: {
                type: Sequelize.FLOAT
            },
            created_at: {
                type: Sequelize.DATE
            },
            updated_at: {
                type: Sequelize.DATE
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('shop_products');
    }
};