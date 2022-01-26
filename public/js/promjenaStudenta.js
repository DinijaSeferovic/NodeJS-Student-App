window.onload=function(){

    let index = document.getElementById("index");
    let grupa = document.getElementById("grupa");
    let ajaxstatus = document.getElementById("ajaxstatus");
    
    document.getElementById("potvrda").addEventListener("click",function(){
        let novaGrupa = {grupa: grupa.value};

        postaviGrupu(index.value, novaGrupa, function(error, data){ 
            if (error==null) {
                ajaxstatus.innerHTML = data.status;
            } else {
                console.log(data);
            }
        });
                
    });
    
}
  





