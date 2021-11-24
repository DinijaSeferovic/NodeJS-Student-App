/*var TestParser = require('../testoviparser');
var chai = require('chai'); */
var assert = chai.assert;
describe('TestParser', function() {
 describe('dajTacnost()', function() {
   it('should return 100% accuracy', function() {
     var report1 = "{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":2,\"pending\":0,\"failures\":0,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"should return 2 values when parameter is string\",\"fullTitle\":\"Function should return 2 values when parameter is string\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should return 3 values when parameter is a number\",\"fullTitle\":\"Function should return 3 values when parameter is a number\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[],\"passes\":[{\"title\":\"should return 2 values when parameter is string\",\"fullTitle\":\"Function should return 2 values when parameter is string\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should return 3 values when parameter is a number\",\"fullTitle\":\"Function should return 3 values when parameter is a number\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";
     var result1 = TestParser.dajTacnost(report1);
     assert.equal(result1.tacnost, "100%", "Tacnost treba biti 100%");
     assert.deepEqual(result1.greske,[]);
   });
   it('should return 50% accuracy', function() {
    var report2 = "{\"stats\":{\"suites\":2,\"tests\":2,\"passes\":1,\"pending\":0,\"failures\":1,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"should return 2 values when parameter is string\",\"fullTitle\":\"Function should return 2 values when parameter is string\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should return 4 values when parameter is a number\",\"fullTitle\":\"Function should return 4 values when parameter is a number\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"should return 4 values when parameter is a number\",\"fullTitle\":\"Function should return 4 values when parameter is a number\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"should return 2 values when parameter is string\",\"fullTitle\":\"Function should return 2 values when parameter is string\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";
    var result2 = TestParser.dajTacnost(report2);
    var niz = ["Function should return 4 values when parameter is a number"];
    assert.equal(result2.tacnost, "50%", "Tacnost treba biti 50%");
    assert.deepEqual(result2.greske,niz);
   });
   it('should return 75% accuracy', function() {
    var report3 = "{\"stats\":{\"suites\":2,\"tests\":4,\"passes\":3,\"pending\":0,\"failures\":1,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"should return 2 values when parameter is string\",\"fullTitle\":\"Function should return 2 values when parameter is string\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should return 4 values when parameter is a number\",\"fullTitle\":\"Function should return 4 values when parameter is a number\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should return 3 values when parameter is boolean\",\"fullTitle\":\"Function should return 3 values when parameter is boolean\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should return no values when there is no parameter\",\"fullTitle\":\"Function should return no values when there is no parameter\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"should return 4 values when parameter is a number\",\"fullTitle\":\"Function should return 4 values when parameter is a number\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"should return 2 values when parameter is string\",\"fullTitle\":\"Function should return 2 values when parameter is string\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should return 3 values when parameter is boolean\",\"fullTitle\":\"Function should return 3 values when parameter is boolean\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should return no values when there is no parameter\",\"fullTitle\":\"Function should return no values when there is no parameter\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";
    var result3 = TestParser.dajTacnost(report3);
    var niz = ["Function should return 4 values when parameter is a number"];
    assert.equal(result3.tacnost, "75%", "Tacnost treba biti 75%");
    assert.deepEqual(result3.greske,niz);
   });
   it('should return 33.3% accuracy', function() {
    var report3 = "{\"stats\":{\"suites\":2,\"tests\":3,\"passes\":1,\"pending\":0,\"failures\":2,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"should return 2 values when parameter is string\",\"fullTitle\":\"Function should return 2 values when parameter is string\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should return 4 values when parameter is a number\",\"fullTitle\":\"Function should return 4 values when parameter is a number\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should return no values when there is no parameter\",\"fullTitle\":\"Function should return no values when there is no parameter\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"should return 4 values when parameter is a number\",\"fullTitle\":\"Function should return 4 values when parameter is a number\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"should return no values when there is no parameter\",\"fullTitle\":\"Function should return no values when there is no parameter\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"should return 2 values when parameter is string\",\"fullTitle\":\"Function should return 2 values when parameter is string\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}";
    var result3 = TestParser.dajTacnost(report3);
    var niz = ["Function should return 4 values when parameter is a number","Function should return no values when there is no parameter"];
    assert.equal(result3.tacnost, "33.3%", "Tacnost treba biti 33.3%");
    assert.deepEqual(result3.greske,niz);
   });
   it('should return 0% accuracy', function() {
    var report3 = "{\"stats\":{\"suites\":0,\"tests\":0,\"passes\":0,\"pending\":0,\"failures\":0,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[],\"pending\":[],\"failures\":[],\"passes\":[]}";
    var result3 = TestParser.dajTacnost(report3);
    var niz = [];
    assert.equal(result3.tacnost, "0%", "Tacnost treba biti 0%");
    assert.deepEqual(result3.greske,niz);
   });
   it('should return 0% accuracy and an error', function() {
    var report3 = "\"stats\":{\"suites\":0,\"tests\":0,\"passes\":0,\"pending\":0,\"failures\":0,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[],\"pending\":[],\"failures\":[],\"passes\":[]";
    var result3 = TestParser.dajTacnost(report3);
    var niz = "Testovi se ne mogu izvršiti";
    assert.equal(result3.tacnost, "0%", "Tacnost treba biti 0%");
    assert.deepEqual(result3.greske,niz);
   });
 });
});

