'use strict';
module.exports = (sequelize, DataTypes) => {
  var order = sequelize.define('Order', {
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    delivey_date: DataTypes.DATE,
    address: DataTypes.STRING,
    delivery_service: DataTypes.STRING,
    payment: DataTypes.STRING,
    status: DataTypes.STRING,
    total_price: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
      tableName: 'shop_orders'
  });
  return order;
};