'use strict';
module.exports = (sequelize, DataTypes) => {
  var shop_cart = sequelize.define('Cart', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          console.log(models)
      }
    },
    tableName: 'shop_cart'
  });
  return shop_cart;
};