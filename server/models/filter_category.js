'use strict';
module.exports = (sequelize, DataTypes) => {
    var filterCategory = sequelize.define('FilterCategory', {
        category_id: DataTypes.INTEGER,
        filter_id: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        tableName: 'shop_filter_categories'
    });
    return filterCategory;
};