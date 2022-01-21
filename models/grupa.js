const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Grupa = sequelize.define("grupa",{
        id: {
            type:Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        naziv:Sequelize.TEXT,
        termin:Sequelize.TEXT
    })
    return Grupa;
};