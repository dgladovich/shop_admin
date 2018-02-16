'use strict';
module.exports = (sequelize, DataTypes) => {
    var product_images = sequelize.define('ProductImages', {
        title: DataTypes.STRING,
        product_id: DataTypes.INTEGER,
        src: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        tableName: 'shop_product_images'
    });
    return product_images;
};