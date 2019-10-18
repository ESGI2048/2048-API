'use strict' ;


module.exports = (sequelize, DataTypes) => {
    const Code = sequelize.define('Code',{
        code : {type : DataTypes.STRING, allowNull: false, unique: true },
        creation_date : {type: DataTypes.DATE, allowNull : false} ,
        expiration_date : {type: DataTypes.DATE, allowNull : false},
        score : { type: DataTypes.INTEGER, allowNull: false},
        reward : {type : DataTypes.FLOAT, allowNull: false}
    },{
        tableName : 'Code',
        paranoid : false,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        version: false,
    });
    return Code;
};
