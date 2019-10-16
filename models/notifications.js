'use strict' ;


module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification',{
        name : {type : DataTypes.STRING, allowNull: false, unique: true },
        Content : {type : DataTypes.STRING, allowNull: false}
    },{
        tableName : 'Notification',
        paranoid : false,
        timestamps : false,
        underscored: true,
        freezeTableName: true,
        version: false,
    });
    return Notification;
};
