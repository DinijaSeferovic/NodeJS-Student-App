var TestParser =(function(){
    const dajTacnost = function (report) {
        var postotak;
        var zaokruzenPostotak;
        var nizNazivaGresaka = [];
        var ulaz;
        try {
            ulaz = JSON.parse(report);
        } catch(e) {
            return {"tacnost": "0%", "greske": "Testovi se ne mogu izvršiti"};
        }
        if (ulaz.stats.tests == 0) return {"tacnost": "0%", "greske": []};
        postotak = (ulaz.stats.passes/ulaz.stats.tests) *100;
        zaokruzenPostotak = (Math.round( postotak * 10 ) / 10).toString() + "%";
        //Nalazenje gresaka ako ih ima
        if (ulaz.stats.passes<ulaz.stats.tests) {
            for (let i = 0; i < ulaz.failures.length; i++) {
                nizNazivaGresaka[i] = ulaz.failures[i].fullTitle;
              }
        }
        const obj = {"tacnost": zaokruzenPostotak, "greske": nizNazivaGresaka};
        return obj;
    }
    function compare(a, b) {
        if ( a.fullTitle < b.fullTitle ){
          return -1;
        }
        if ( a.fullTitle > b.fullTitle ){
          return 1;
        }
        return 0;
    }

    function greskeUPrvom(rez1, rez2) {
        let greske1 = rez1.failures;
        let razlika = [];
        let test2 = rez2.tests;
        let brojac = 0;
        //Testovi koji padaju u prvom a ne nalaze se u drugom
        for (let i=0; i<greske1.length; i++) {
            if (!test2.some(e => e.fullTitle === (greske1[i].fullTitle))) {
                brojac++;
                razlika[i] = greske1[i];
            }
        }
        razlika.sort(compare);
        return {brojac: brojac, razlika: razlika};
    }
    const porediRezultate = function (rezultat1, rezultat2) {
        var x;
        var postotak;
        var nizGresaka = [];
        var nizNazivaGresaka = [];
        var sortiraniNizGresakaDrugog = [];
        var ulaz1;
        var ulaz2;
        try {
            ulaz1 = JSON.parse(rezultat1);
            ulaz2 = JSON.parse(rezultat2);
        } catch(e) {
            return {"promjena": "0%", "greske": "Testovi se ne mogu izvršiti"};
        }
        var jednaki;
        var tests1 = ulaz1.tests.sort(compare);
        var tests2 = ulaz2.tests.sort(compare);
        for (let i=0; i<tests1.length; i++) {
            if (tests1[i].fullTitle==tests2[i].fullTitle && tests1.length==tests2.length) jednaki=true;
            else {
                jednaki=false;
                break;
            }
        }
        sortiraniNizGresakaDrugog = ulaz2.failures.sort(compare);
        if (jednaki) {
            x = dajTacnost(rezultat2).tacnost;
            nizGresaka = sortiraniNizGresakaDrugog;
            
        }
        else {
            x = (greskeUPrvom(ulaz1, ulaz2).brojac + ulaz2.failures.length) / (greskeUPrvom(ulaz1, ulaz2).brojac + ulaz2.tests.length) * 100;
            nizGresaka = greskeUPrvom(ulaz1, ulaz2).razlika;
            nizGresaka = nizGresaka.concat(sortiraniNizGresakaDrugog);
        }
        postotak = x.toString();
        if (!jednaki) postotak += "%"; 
        for (let i=0; i<nizGresaka.length; i++) {
            nizNazivaGresaka[i] = nizGresaka[i].fullTitle;
        }

        return {"promjena": postotak, "greske": nizNazivaGresaka};
    }
    return {
        dajTacnost: dajTacnost,
        porediRezultate: porediRezultate
    }
 
}());
