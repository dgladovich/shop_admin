'use strict';
module.exports = (sequelize, DataTypes) => {
    var delivery = sequelize.define('Delivery', {
        name: DataTypes.STRING,
        title: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        tableName: 'shop_deliveries'
    });
    return delivery;
};