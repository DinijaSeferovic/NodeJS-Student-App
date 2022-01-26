window.onload=function(){

    let index = document.getElementById("index");
    let grupa = document.getElementById("grupa");
    let statustext = document.getElementById("statustext");
    
    document.getElementById("potvrda").addEventListener("click",function(){
        let novaGrupa = {grupa: grupa.value};

        postaviGrupu(index.value, novaGrupa, function(error, data){ 
            if (error==null) {
                statustext.innerHTML = data.status;
            } else {
                console.log(data);
            }
        });
                
    });
    
}
  





