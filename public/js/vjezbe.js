window.onload=function(){
    
    dohvatiPodatke(getObjekat);

}

function getObjekat(error,data) {
    if (error!=null) {
        console.log(error);
    }
    else {
        var firstKey = Object.keys(data)[0];
        if (data[firstKey]=='error') {
            console.log(data['data']);
        }
        else {
            const vjezbeField = document.getElementById("vjezbe-flex");
            iscrtajVjezbe(vjezbeField, data);
        }
        
    }
    
}