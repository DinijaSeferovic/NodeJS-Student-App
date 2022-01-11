chai.should();
 
describe('Tests for VjezbeAjax', function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
 
    this.requests = [];
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });
 
  afterEach(function() {
    this.xhr.restore();
  });

  it('should post the given response data as JSON body ', function() {
    var data = {brojVjezbi: 4, brojZadataka: [1,2,3,4] };
    var dataJson = JSON.stringify(data);
   
    posaljiPodatke(data, function() { });
   
    this.requests[0].requestBody.should.equal(dataJson);
  });
 
  it('should parse the fetched response data as JSON ', function(done) {
    var data = { brojVjezbi: 4, brojZadataka: [1,2,3,4] };
    var dataJson = JSON.stringify(data);
   
    dohvatiPodatke(function(err, result) {
      result.should.deep.equal(data);
      done();
    });
   
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, dataJson);
  });

  it('should return an error into the callback ', function(done) {
    dohvatiPodatke(function(err, result) {
      err.should.exist;
      done();
    });
   
    this.requests[0].respond(500);
  });


});