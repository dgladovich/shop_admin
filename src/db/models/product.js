'use strict';
module.exports = (sequelize, DataTypes) => {
  var product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
      tableName: 'shop_products'
  });
  return product;
};