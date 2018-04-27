'use strict';
module.exports = (sequelize, DataTypes) => {
  var order_products = sequelize.define('ProductOrder', {
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {
      tableName: 'shop_order_products'
  });
  order_products.associate = function(models) {
      order_products.belongsTo(models.Order, {as: 'products', foreignKey: 'order_id'});
      order_products.belongsTo(models.Product, {as: 'productObject', foreignKey: 'product_id'});
  };
  return order_products;
};