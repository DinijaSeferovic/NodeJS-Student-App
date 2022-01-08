const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

///app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',express.static(path.join(__dirname, "public/html")));
app.use('/',express.static(path.join(__dirname, "public/css")));
app.use('/',express.static(path.join(__dirname, "public/images")));
app.use('/',express.static(path.join(__dirname, "public/js")));


app.get('/vjezbe', function (req, res) {
    fs.readFile("vjezbe.csv", function(err, data) {
        try {
            var csvString = data.toString('utf-8');

            var lines = csvString.split("\n");
            lines.shift();

            var zadaci = [];

            let line = [];
            for (let i=0; i<lines.length; i++) {
                line = lines[i].split(',');
                zadaci[i] = parseInt(line[1]);
            }

            var result = {brojVjezbi: lines.length, brojZadataka: zadaci};
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            if (lines.length>0 && lines.length<=15 && zadaci.every(num => parseInt(num)<=10 && parseInt(num)>=0)) {
                res.write(JSON.stringify(result));
            }
            else {
                console.log("Neispravni podaci");
            }
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
    let brojZadataka = [];

    for (let i=0; i<brojVjezbi; i++) {
        brojZadataka[i] = tijelo['brojZadataka'][i];
        novaLinija += i.toString() + "," + brojZadataka[i] + "\n";
    }

    pogresno = [];

    if (brojVjezbi<1 || brojVjezbi>15) pogresno.push("brojVjezbi");
    for (let i=0; i<brojZadataka.length; i++) {
        if (brojZadataka[i]>10 || brojZadataka[i]<0)
            pogresno.push("z"+ i.toString());
    }
    
    let errorData = "Pogrešan parametar ";

    for (let i=0 ; i<pogresno.length; i++) {
        errorData+=pogresno[i];
        if (i!=pogresno.length-1) errorData+=","
    }

    if (pogresno.length!=0) {
        res.json({status:"error",data:errorData});
    }
    else {
        fs.writeFile('vjezbe.csv',novaLinija,function(err){
            if(err) console.log("Greska");
            res.json({brojVjezbi:brojVjezbi,brojZadataka:brojZadataka});
        });
    }

    
});
 

app.listen(3000);
  

