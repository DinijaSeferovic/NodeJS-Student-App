var TestParser =(function(){
    const dajTacnost = function (report) {
        var postotak;
        var zaokruzenPostotak;
        var nizGresaka = [];
        let ulaz;
        try {
            ulaz = JSON.parse(report);
        } catch(e) {
            return {tacnost: "0%", greske: "Testovi se ne mogu izvršiti"};
        }
        if (ulaz.stats.tests == 0) return {tacnost: "0%", greske: []};
        postotak = (ulaz.stats.passes/ulaz.stats.tests) *100;
        zaokruzenPostotak = (Math.round( postotak * 10 ) / 10).toString() + "%";
        if (ulaz.stats.passes<ulaz.stats.tests) {
            for (let i = 0; i < ulaz.failures.length; i++) {
                nizGresaka[i] = ulaz.failures[i].fullTitle;
              }
        }
        const obj = {tacnost: zaokruzenPostotak, greske: nizGresaka};
        return obj;
    }
    return {
        dajTacnost: dajTacnost
    }
 
}());
