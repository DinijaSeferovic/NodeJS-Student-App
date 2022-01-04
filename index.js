const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/vjezbe', function (req, res) {
    fs.readFile("vjezbe.csv", function(err, data) {
        try {
            var csvString = data.toString('utf-8').replace(/[\n]/g, "");
    
            var lines = csvString.split("\r");
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

app.get('/z1.html', function (req, res) {
    res.sendFile( __dirname + "/public/html/" + "z1.html" );
});

app.get('/vjezbe.html', function (req, res) {
    res.sendFile( __dirname + "/public/html/" + "vjezbe.html" );
});

app.get('/mojRepozitorij.html', function (req, res) {
    res.sendFile( __dirname + "/public/html/" + "mojRepozitorij.html" );
});

app.get('/zadaci.html', function (req, res) {
    res.sendFile( __dirname + "/public/html/" + "zadaci.html" );
});

app.listen(3000);
  

