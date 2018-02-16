'use strict';
module.exports = (sequelize, DataTypes) => {
    var visit = sequelize.define('Visit', {
        user_id: DataTypes.INTEGER,
        created_at: DataTypes.DATE
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        tableName: 'shop_visits'
    });
    return visit;
};