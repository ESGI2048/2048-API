'use strict' ;


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        firstName : {type : DataTypes.STRING, allowNull: false},
        lastName : {type : DataTypes.STRING, allowNull: false},
        login:  {type : DataTypes.STRING, unique : true, allowNull: false},
        password:  {type : DataTypes.STRING, allowNull: false},
        email : {type : DataTypes.STRING, unique: true, allowNull: false, validate :{isEmail : true}},
        score : {type : DataTypes.INTEGER, allowNull: true}
    },{
        tableName : 'User',
        paranoid : true,
        underscored: true,
        freezeTableName: true,
        version: true,
    });
    return User;
};
