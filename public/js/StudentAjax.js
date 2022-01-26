function dodajStudenta(student, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            var jsonRez = JSON.parse(ajax.responseText);
            fnCallback(null,jsonRez);
        }
        else if (ajax.readyState == 4)
            fnCallback(ajax.statusText,null);
    }
    ajax.open("POST", "http://localhost:3000/student", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(student));
}

function postaviGrupu(index, grupa, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            var jsonRez = JSON.parse(ajax.responseText);
            fnCallback(null,jsonRez);
        }
        else if (ajax.readyState == 4)
            fnCallback(ajax.statusText,null);
    }
    ajax.open("PUT", "http://localhost:3000/student/"+index, true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(grupa));
}

function dodajBatch(csvStudenti, fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            var jsonRez = JSON.parse(ajax.responseText);
            fnCallback(null,jsonRez);
        }
        else if (ajax.readyState == 4)
            fnCallback(ajax.statusText,null);
    }
    ajax.open("POST", "http://localhost:3000/batch/student", true);
    ajax.setRequestHeader("Content-Type", "text/plain");
    ajax.send(csvStudenti);
}