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

app.get('/vjezbe', function (req, res) {
    fs.readFile("vjezbe.csv", function(err, data) {
        try {
            var csvString = data.toString('utf-8');

            var lines = csvString.split("\n");
            lines.shift();
            lines.pop();

            var zadaci = [];

            let line = [];
            for (let i=0; i<lines.length; i++) {
                line = lines[i].split(',');
                zadaci[i] = parseInt(line[1]);
            }

            var result = {};
            res.writeHead(200, {'Content-Type': 'application/json'});
            if (lines.length<1 ||  lines.length>15) {
                result = {status:'error', data: 'Pogrešan parametar brojVjezbi'};
                console.log("Neispravni podaci");
            } 
            else if (!zadaci.every(num => parseInt(num)<=10 && parseInt(num)>=0) || lines.length!=zadaci.length) {
                result = {status:'error', data: 'Pogrešan parametar brojZadataka'};
                console.log("Neispravni podaci");
            }
            else {
                result = {brojVjezbi: lines.length, brojZadataka: zadaci};
                
            }
            res.write(JSON.stringify(result));
            return res.end(); 

        } catch (err) {
            console.log("Neispravna datoteka");
        }
        
  });
});


app.post('/vjezbe',function(req,res){
    let tijelo = req.body;
    let novaLinija = "brojVjezbi" + "," + "brojZadataka"+"\n";

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
        for (let i=0; i<brojVjezbi; i++) {
            novaLinija += i.toString() + "," + brojZadataka[i] + "\n";
        }

        fs.writeFile('vjezbe.csv',novaLinija,function(err){
            if(err) console.log("Greska");
            res.json({brojVjezbi:brojVjezbi,brojZadataka:brojZadataka});
        });
    }

    
});
 

app.listen(3000);
  

