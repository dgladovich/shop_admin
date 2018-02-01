'use strict';
module.exports = (sequelize, DataTypes) => {
    var product_wishes = sequelize.define('ProductWish', {
        user_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        status: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        tableName: 'shop_product_wishes'
    });
    return product_wishes;
};