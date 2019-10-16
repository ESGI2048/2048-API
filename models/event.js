'use strict' ;


module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event',{
        name : {type : DataTypes.STRING, allowNull: false, unique: true },
        place : {type : DataTypes.STRING, allowNull: false},
        date : {type: DataTypes.DATE, allowNull : false} ,
        filePath : {type: DataTypes.STRING, allowNull : false} ,
        description : {type: DataTypes.STRING, allowNull : false, unique: true}
    },{
        tableName : 'Event',
        paranoid : false,
        timestamps : false,
        underscored: true,
        freezeTableName: true,
        version: false,
    });
    return Event;
};
