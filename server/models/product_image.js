'use strict';
module.exports = (sequelize, DataTypes) => {
    var product_images = sequelize.define('ProductImage', {
        title: DataTypes.STRING,
        product_id: DataTypes.INTEGER,
        src: DataTypes.STRING,
        main: DataTypes.BOOLEAN,
    }, {
        tableName: 'shop_product_images'
    });
    product_images.associate = function (models) {
      models.Product.hasMany(product_images, {as: 'images', foreignKey: 'product_id'})
      // associations can be defined here
    };
    return product_images;
};
