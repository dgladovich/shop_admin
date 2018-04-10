'use strict';
module.exports = (sequelize, DataTypes) => {
  var product_visit = sequelize.define('ProductVisit', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
      tableName: 'shop_product_visits'
  });
  return product_visit;
};