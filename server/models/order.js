'use strict';
module.exports = (sequelize, DataTypes) => {
    var order = sequelize.define('Order', {
        user_id: DataTypes.INTEGER,
        delivey_date: DataTypes.DATE,
        address: DataTypes.STRING,
        delivery_service: DataTypes.STRING,
        payment: DataTypes.STRING,
        status: DataTypes.STRING,
        total_price: DataTypes.FLOAT
    }, {
        tableName: 'shop_orders'
    });

    order.associate = function (models) {
        let {ProductOrder} = models;
        order.hasMany(ProductOrder, {as: 'products', foreignKey: 'order_id'});
    };
    return order;
};