window.onload=function(){
    
    dohvatiPodatke(getObjekat);

}

function getObjekat(error,data) {
    console.log(error);
    const vjezbeField = document.getElementById("vjezbe-flex");
    iscrtajVjezbe(vjezbeField, data);
}