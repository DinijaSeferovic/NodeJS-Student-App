window.onload=function(){

    let ime = document.getElementById("ime");
    let prezime = document.getElementById("prezime");
    let index = document.getElementById("index");
    let grupa = document.getElementById("grupa");
    let statustext = document.getElementById("statustext");
    
    document.getElementById("potvrda").addEventListener("click",function(){
        let student = {ime: ime.value, prezime: prezime.value, index: index.value, grupa: grupa.value};
            
        dodajStudenta(student, function(error, data){ 
            if (error==null) {
                statustext.innerHTML = data.status;
            } else {
                console.log(data);
            }
        });
                
    });
    
}
  





