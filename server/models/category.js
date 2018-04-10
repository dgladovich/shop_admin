'use strict';
module.exports = (sequelize, DataTypes) => {
    var category = sequelize.define('Category', {
        title: DataTypes.STRING,
        view_title: DataTypes.STRING,
        image: DataTypes.STRING,
        created_at: DataTypes.DATE,
        description: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        tableName: 'shop_categories'
    });
    return category;
};