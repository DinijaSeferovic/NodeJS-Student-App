const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2118359","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});

const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.Student = require('./models/student.js')(sequelize);
db.Grupa = require('./models/grupa.js')(sequelize);
db.Vjezba = require('./models/vjezba.js')(sequelize);
db.Zadatak = require('./models/zadatak.js')(sequelize);

//relacije
db.Grupa.hasMany(db.Student, {foreignKey:'grupaId', as:'studentiGrupe'})
db.Vjezba.hasMany(db.Zadatak, {foreignKey:'vjezbaId', as:'zadaciVjezbe', onDelete: 'cascade', hooks:true})


module.exports = db;

