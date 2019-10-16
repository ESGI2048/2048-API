'use strict' ;


module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event',{
        name : {type : DataTypes.STRING, allowNull: false, unique: true },
        place : {type : DataTypes.STRING, allowNull: false},
        date : {type: DataTypes.DATE, allowNull : false} ,
        description : {type: DataTypes.STRING, allowNull : false, unique: true}
    },{
        tableName : 'Event',
        paranoid : true,
        underscored: true,
        freezeTableName: true,
        version: true,
    });
    return Event;
};
