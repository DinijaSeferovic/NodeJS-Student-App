window.onload=function(){
    const zadaciField = document.getElementById("zadaciField");

    var broj = document.getElementById("brojVjezbi");
    
        document.getElementById("potvrda").addEventListener("click",function(){
            if (broj.value>0 && broj.value<16) {
                dodajInputPolja(zadaciField, broj.value);
                
            
                document.getElementById("posalji").addEventListener("click",function(){
                    let brojZadataka=[];
                    for (let i=0; i<broj.value; i++) {
                        brojZadataka[i] = document.getElementById("z"+i.toString()).value;
                    }
                    let obj = {brojVjezbi:broj.value, brojZadataka:brojZadataka};

                    posaljiPodatke(obj, function(error, data){ 
                        if (error==null && data[Object.keys(data)[0]]!="error") {
                            alert("Uspješno poslano");
                        } else {
                            console.log(data);
                        }
                    });
                    
                });
            }
            else {
                console.log({status: 'error', data: 'Pogrešan parametar brojVjezbi'});
            }
        });
    
}
  





