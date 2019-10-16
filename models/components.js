'use strict' ;


module.exports = (sequelize, DataTypes) => {
    const Component = sequelize.define('Component',{
        name : {type : DataTypes.STRING, allowNull: false, unique: true },
        type : {type : DataTypes.ENUM('Aiguille', 'Cadran', 'Boitier', 'Lunette', 'Quartz', 'Bracelet', 'Verre', 'Platine', 'Mouvement', 'Mobile', 'Barillet' ), allowNull: false},
        filePath : {type: DataTypes.STRING, allowNull : false} ,
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
