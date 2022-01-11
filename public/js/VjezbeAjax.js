var otvorene = [];

function dodajInputPolja(DOMelementDIVauFormi,brojVjezbi) {
    var izlaz = '';
    if (brojVjezbi>0 && brojVjezbi<16) {
        for (let i=0; i<brojVjezbi; i++) {
            izlaz += '<label for="z'+i.toString()+'">Broj zadataka za vježbu '+(i+1).toString()+'</label>'+
                    '<input type="number" name="z'+i.toString()+'" id="z'+i.toString()+'" value=4>';
        }

        izlaz += '<input type="button" value="Pošalji" id="posalji" name="posalji">';
    }
    DOMelementDIVauFormi.innerHTML = izlaz;
}

function posaljiPodatke(vjezbeObjekat,callbackFja) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            var jsonRez = JSON.parse(ajax.responseText);
            callbackFja(null,jsonRez);
        }
        else if (ajax.readyState == 4)
            callbackFja(ajax.statusText,null);
    }
    ajax.open("POST", "http://localhost:3000/vjezbe", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(vjezbeObjekat));
}

function dohvatiPodatke(callbackFja) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            var jsonRez = JSON.parse(ajax.responseText);
            callbackFja(null,jsonRez);
        }
        else if (ajax.readyState == 4)
            callbackFja(ajax.statusText,null);
    }
    ajax.open("GET", "http://localhost:3000/vjezbe", true);
    ajax.send();
}

function iscrtajVjezbe(divDOMelement,vjezbeObjekat) {

    var izlaz = '';

    if (vjezbeObjekat['brojVjezbi']>0 && vjezbeObjekat['brojVjezbi']<16) {

        for (let i=0; i<vjezbeObjekat['brojVjezbi']; i++) {
            izlaz += `<div class="vjezba" id="vjezba${(i + 1).toString()}"><button class="vjezbabtn" >Vježba ${(i + 1).toString()}</button></div>`;
            
        }
    
        divDOMelement.innerHTML = izlaz;

        for (let i=0; i<vjezbeObjekat['brojVjezbi']; i++) {
            document.getElementById('vjezba'+(i + 1).toString()).onclick = function() {
                
                otvorene.push(i+1);
                iscrtajZadatke(document.getElementById('vjezba'+(i + 1).toString()),vjezbeObjekat['brojZadataka'][i]);
                
                
            }
        }
    }
}


function iscrtajZadatke(vjezbaDOMelement,brojZadataka) {

    var brojVjezbe = vjezbaDOMelement.getAttribute("id").slice(-1);

    var izlaz = '<div class="zadaci" id="zadaci'+brojVjezbe+'">';
    if (brojZadataka>=0 && brojZadataka<11) {

        for (let i=0; i<brojZadataka; i++) {
            izlaz += `<button>Zadatak ${(i + 1).toString()}</button>`;
        }
    }
    izlaz += '</div>';
    if (otvorene.length<2) {
        vjezbaDOMelement.insertAdjacentHTML('afterend', izlaz);
    }
    else if (otvorene.filter(x => x === parseInt(brojVjezbe)).length==1) {
        for (let element of document.getElementsByClassName("zadaci")){
            element.style.display="none";
         }
        vjezbaDOMelement.insertAdjacentHTML('afterend', izlaz);
    }
    else {
        for (let element of document.getElementsByClassName("zadaci")){
            element.style.display="none";
         }
        document.getElementById("zadaci"+brojVjezbe).style.display = "block";
    }
    
    
}