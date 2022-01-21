const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2118359","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});

module.exports = sequelize;

