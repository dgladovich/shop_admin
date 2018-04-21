'use strict';
module.exports = (sequelize, DataTypes) => {
    var category = sequelize.define('Category', {
        title: DataTypes.STRING,
        view_title: DataTypes.STRING,
        image: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        description: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        tableName: 'shop_categories',
        timestamps: false
    });
    return category;
};