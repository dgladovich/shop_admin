'use strict';
module.exports = (sequelize, DataTypes) => {
    var filter = sequelize.define('Filter', {
        name: DataTypes.STRING,
        title: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        tableName: 'shop_filters'
    });
    return filter;
};