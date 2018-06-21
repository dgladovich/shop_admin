'use strict';
module.exports = (sequelize, DataTypes) => {
    var product = sequelize.define('Product', {
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        category: DataTypes.STRING,
        short_decsription: DataTypes.STRING,
        full_decsription: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        timestamps: false,
        tableName: 'shop_products'
    });
    return product;
};