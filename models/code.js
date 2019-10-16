'use strict' ;


module.exports = (sequelize, DataTypes) => {
    const Code = sequelize.define('Code',{
        code : {type : DataTypes.STRING, allowNull: false, unique: true },
        creationDate : {type: DataTypes.DATE, allowNull : false} ,
        expirationDate : {type: DataTypes.DATE, allowNull : false} ,
        description : {type: DataTypes.STRING, allowNull : false, unique: true}
    },{
        tableName : 'Code',
        paranoid : true,
        underscored: true,
        freezeTableName: true,
        version: true,
    });
    return Code;
};
