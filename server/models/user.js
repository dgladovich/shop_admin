'use strict';
module.exports = (sequelize, DataTypes) => {
    var shop_user = sequelize.define('User', {
        name: DataTypes.STRING,
        age: DataTypes.INTEGER,
        email: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        phone_number: DataTypes.STRING,
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