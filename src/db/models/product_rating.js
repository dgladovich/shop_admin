'use strict';
module.exports = (sequelize, DataTypes) => {
    var product_rating = sequelize.define('ProductRating', {
        user_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        mark: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        tableName: 'shop_product_ratings'
    });
    return product_rating;
};