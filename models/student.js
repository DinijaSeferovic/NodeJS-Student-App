const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define("student",{
        id: {
            type:Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        ime:Sequelize.TEXT,
        prezime:Sequelize.TEXT,
        index:Sequelize.TEXT
    })
    return Student;
};