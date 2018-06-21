'use strict';
module.exports = (sequelize, DataTypes) => {
    var category = sequelize.define('Category', {
        title: DataTypes.STRING,
        view_title: DataTypes.STRING,
        image: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE(3),
            allowNull: true,
            defaultValue: sequelize.literal('NOW()'),
        },
        updatedAt: {
            type: DataTypes.DATE(3),
            allowNull: true,
            defaultValue: sequelize.literal('NOW()'),
        },
        description: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
        ,
        tableName: 'shop_categories',
        timestamps:
            false
    });
    return category;
};