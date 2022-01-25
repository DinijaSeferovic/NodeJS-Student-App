const Sequelize = require('sequelize');
const sequelize = require('./db.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('public/html'));
app.use(express.static('public/js'));
app.use(express.static('public/css'));
app.use(express.static('public/images'));
app.use(express.static('public/test'));

//import modela
const Student = require('./models/student.js')(sequelize);
const Grupa = require('./models/grupa.js')(sequelize);
const Vjezba = require('./models/vjezba.js')(sequelize);
const Zadatak = require('./models/zadatak.js')(sequelize);

//relacije
Grupa.hasMany(Student, {foreignKey:'grupaId', as:'studentiGrupe'})
Vjezba.hasMany(Zadatak, {foreignKey:'vjezbaId', as:'zadaciVjezbe', onDelete: 'cascade', hooks:true})

Student.sync();
Grupa.sync();
Vjezba.sync();
Zadatak.sync();

app.get('/vjezbe', function (req, res) {

    Vjezba.findAll({order: [['naziv','ASC']]}).then(function(vjezbe) {
    
        var zadaci = [];
        
        vjezbe.forEach(vjezba => vjezba.getZadaciVjezbe().then(function(zadaciVjezbe) {
            postaviZadatke(zadaciVjezbe.length, vjezba);
        }));

        function postaviZadatke(zadatak, vjezba) {
        
            zadaci.push(zadatak);
            if (vjezbe[vjezbe.length-1]===vjezba) {
                var result = {};
                res.writeHead(200, {'Content-Type': 'application/json'});
                if (vjezbe.length<1 ||  vjezbe.length>15) {
                result = {status:'error', data: 'Pogrešan parametar brojVjezbi'};
                    console.log("Neispravni podaci");
                } 
                else if (!zadaci.every(num => parseInt(num)<=10 && parseInt(num)>=0)) {
                    result = {status:'error', data: 'Pogrešan parametar brojZadataka'};
                    console.log("Neispravni podaci");
                }
                else {
                    result = {brojVjezbi: vjezbe.length, brojZadataka: zadaci};
                            
                }
                res.write(JSON.stringify(result));
                return res.end(); 
            }
        }
    });
});


app.post('/vjezbe',function(req,res){

    let tijelo = req.body;
    
    let brojVjezbi = tijelo['brojVjezbi'];
    let brojZadataka = tijelo['brojZadataka'];

    let pogresno = [];

    if (brojVjezbi<1 || brojVjezbi>15) pogresno.push("brojVjezbi");
    else if (brojVjezbi!=brojZadataka.length) pogresno.push("brojZadataka");
    
    for (let i=0; i<brojZadataka.length; i++) {
        if (brojZadataka[i]>10 || brojZadataka[i]<0)
            pogresno.push("z"+ i.toString());
    }
    
    let errorData = "Pogrešan parametar ";

    if (pogresno.length!=0) {
        for (let i=0 ; i<pogresno.length; i++) {
            errorData+=pogresno[i];
            if (i!=pogresno.length-1) errorData+=","
        }
        res.json({status:"error",data:errorData});
    }
    else {
        
        Zadatak.destroy({truncate: true, restartIdentity: true});
        Vjezba.destroy({truncate: { cascade: true }, restartIdentity: true});

        var zadaciListaPromisea=[];
        var vjezbeListaPromisea=[];

        for (let i=0; i<brojZadataka.length; i++) {
            for (let j=0; j<brojZadataka[i]; j++) {
                zadaciListaPromisea.push(
                    Zadatak.create({naziv:"Zadatak "+(j+1).toString()})
                );
            }
        }
        
        Promise.all(zadaciListaPromisea).then(function(zadaciIzBaze){
            var zadaciPoVjezbama = [];
            
            let i,j,v;
            for (i = 0, v = 0, j = zadaciIzBaze.length; i < j, v<brojVjezbi; i += brojZadataka[v], v++) {
                zadaciPoVjezbama[v] = zadaciIzBaze.slice(i, i + brojZadataka[v]);
            }
                
            for (let i=0; i<brojVjezbi; i++) {
                vjezbeListaPromisea.push(
                    Vjezba.create({naziv:"Vježba "+(i+1).toString()}).then(function(v){
                        return v.setZadaciVjezbe(zadaciPoVjezbama[i]).then(function(){
                        return new Promise(function(resolve,reject){resolve(v);reject("");});
                        });
                    })
                );
            }
            Promise.all(vjezbeListaPromisea).then(function(v){return v;}).catch(function(err){console.log("Vjezbe greska "+err);});
        }).catch(function(err){console.log("Zadaci greska "+err);});
    res.json({brojVjezbi:brojVjezbi,brojZadataka:brojZadataka});
    }
    
});

app.post('/student',function(req,res){

    let tijelo = req.body;
    
    let ime = tijelo['ime'];
    let prezime = tijelo['prezime'];
    let index = tijelo['index'];
    let grupa = tijelo['grupa'];
    Grupa.findOrCreate({where: {naziv:grupa}}).then((tagGrupa) => {
        Student.findOrCreate({where: {index: index}, defaults: {ime: ime, prezime: prezime, grupaId: tagGrupa[0].id}}).then((tag) => {
            if (tag[1]) {
                res.json({status:"Kreiran student!"});
            }
            else {
                res.json({status:"Student sa indexom "+index.toString()+" već postoji!"});
            }
            
        });
    });
    
});


app.put('/student/:index',function(req,res){

    let tijelo = req.body;
    let grupa = tijelo['grupa'];
    let index = req.params.index;
    
    Grupa.findOrCreate({where: {naziv:grupa}}).then((tagGrupa) => {
        Student.update({ grupaId: tagGrupa[0].id }, {where: { index: index }}).then(result => {
            if (result==1) {
                res.json({status:"Promjenjena grupa studentu "+ index.toString()});
            }
            else {
                res.json({status:"Student sa indexom "+ index.toString()+ " ne postoji"});
            }
        });
    });
});

app.use(bodyParser.text());

app.post('/batch/student',function(req,res){

    let csv = req.body;
    
    var lines = csv.split("\r\n");
    let atributi = [];
    var studentiListaPromisea=[];
    var grupeListaPromisea=[];
    let dodani = 0;
    let indexPostoji = "";

    for (let i=0; i<lines.length; i++) {
        atributi[i] = lines[i].split(",");
        grupeListaPromisea.push(Grupa.findOrCreate({where: {naziv: atributi[i][3]}}));
    }

    Promise.all(grupeListaPromisea).then(function(grupeIzBaze){

        for (let i=0; i<atributi.length; i++) {

            let grupa = grupeIzBaze.find( g => g[0].naziv==atributi[i][3])[0];

            studentiListaPromisea.push(Student.findOrCreate({where: {index: atributi[i][2]},  defaults: {ime: atributi[i][0], prezime: atributi[i][1], grupaId: grupa.id}}).then(function(s){
                    return new Promise(function(resolve,reject){resolve(s);reject("");
                    });
                })
            );
        }
        Promise.all(studentiListaPromisea).then(function(studenti){

            studenti.forEach(s => {
                if (s[1]) dodani++;
                else if (s!=studenti[studenti.length-1]) indexPostoji+=s[0].index.toString()+",";
                else indexPostoji+=s[0].index.toString()
            });

            if (indexPostoji=="") {
                res.json({status:"Dodano " + dodani.toString() + " studenata!"});
            }
            else {
                res.json({status:"Dodano " + dodani.toString() + " studenata, a studenti "+indexPostoji+ " već postoje!"});
            }
        return studenti;}).catch(function(err){console.log("Grupe greska "+err);});
        }).catch(function(err){console.log("Studenti greska "+err);});
});

app.listen(3000);
  

