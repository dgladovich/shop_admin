'use strict';
module.exports = (sequelize, DataTypes) => {
  var order_products = sequelize.define('ProductOrder', {
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
      tableName: 'shop_product_orders'
  });
  return order_products;
};