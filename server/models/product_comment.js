'use strict';
module.exports = (sequelize, DataTypes) => {
  var product_comment = sequelize.define('ProductComment', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    user: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    likes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
      tableName: 'shop_product_comments'
  });
  return product_comment;
};