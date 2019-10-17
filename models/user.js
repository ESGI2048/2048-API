'use strict' ;


const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        first_name : {type : DataTypes.STRING, allowNull: true},
        last_name : {type : DataTypes.STRING, allowNull: true},
        login:  {type : DataTypes.STRING, unique : true, allowNull: false},
        password:  {type : DataTypes.STRING, allowNull: false},
        email : {type : DataTypes.STRING, unique: true, allowNull: true, validate :{isEmail : true}},
        score : {type : DataTypes.INTEGER, allowNull: true},
        phone: {
            type: DataTypes.STRING, allowNull: true, unique: true,
            validate: {
                isValidPhoneNo: function(value) {
                    if (!value) return value;
                    const regexp = /(\d{2}.){4}\d{2}/;
                    if (!regexp.test(value)) {
                        throw new Error("Number only is allowed.");
                    }
                    return value;
                }
            }
        }
    },{
        tableName : 'User',
        paranoid : false,
        timestamps : false,
        underscored: true,
        freezeTableName: true,
        version: false,
    });

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.beforeCreate( function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
};
