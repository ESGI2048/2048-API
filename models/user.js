'use strict' ;




module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        firstName : {type : DataTypes.STRING, allowNull: false},
        lastName : {type : DataTypes.STRING, allowNull: false},
        login:  {type : DataTypes.STRING, unique : true, allowNull: false},
        password:  {type : DataTypes.STRING, allowNull: false},
        email : {type : DataTypes.STRING, unique: true, allowNull: false, validate :{isEmail : true}},
        score : {type : DataTypes.INTEGER, allowNull: true},
        phone: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            unique: true,
            validate: {
                isValidPhoneNo: function(value) {
                    if (!value) return value;

                    const regexp = /^[0-9]+$/;
                    let values = (Array.isArray(value)) ? value : [value];

                    values.forEach(function(val) {
                        if (!regexp.test(val)) {
                            throw new Error("Number only is allowed.");
                        }
                    });
                    return value;
                }
            }
        }
    },{
        tableName : 'User',
        paranoid : true,
        underscored: true,
        freezeTableName: true,
        version: true,
    });
    return User;
};
