window.onload=function(){

    let csv = document.getElementById("csv");
    let statustext = document.getElementById("statustext");
    
    document.getElementById("potvrda").addEventListener("click",function(){
        
        dodajBatch(csv.value, function(error, data){ 
            if (error==null) {
                statustext.innerHTML = data.status;
            } else {
                console.log(data);
            }
        });
                
    });
    
}
  





