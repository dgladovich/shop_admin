'use strict';
module.exports = (sequelize, DataTypes) => {
    var shop_user = sequelize.define('User', {
        name: DataTypes.STRING,
        age: DataTypes.INTEGER,
        email: DataTypes.STRING,
        active: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        tableName: 'shop_users'
    });
    return shop_user;
};