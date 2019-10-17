'use strict' ;


module.exports = (sequelize, DataTypes) => {
    const Component = sequelize.define('Component',{
        name : {type : DataTypes.STRING, allowNull: false, unique: true },
        type : {type : DataTypes.ENUM('Cadran', 'Boitier', 'Boitier avec Cadran', 'Bracelet avec Boitier', 'Bracelet', 'Montre'), allowNull: false},
        file_path : {type: DataTypes.STRING, allowNull : false} ,
        value : {type: DataTypes.INTEGER, allowNull : false, unique: true}
    },{
        tableName : 'Component',
        paranoid : false,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        version: false,
    });
    return Component;
};
