function dodajInputPolja(DOMelementDIVauFormi,brojVjezbi) {
    /*var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200)
           */ 
            var izlaz = '';
            if (brojVjezbi>0 && brojVjezbi<16) {
                for (let i=0; i<brojVjezbi; i++) {
                    izlaz += '<label for="z'+i.toString()+'">Broj zadataka za vježbu '+(i+1).toString()+'</label>'+
                            '<input type="number" name="z'+i.toString()+'" id="z'+i.toString()+'" value=4>';
                }

                izlaz += '<input type="button" value="Pošalji" id="posalji" name="posalji">';
            }
            DOMelementDIVauFormi.innerHTML = izlaz;
        
       /* if (ajax.readyState == 4 && ajax.status == 404)
            console.log("Greska: nepoznat URL");
    }   
    
    ajax.open("GET", "", true);
    ajax.send();*/
}

function posaljiPodatke(vjezbeObjekat,callbackFja) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {// Anonimna funkcija
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