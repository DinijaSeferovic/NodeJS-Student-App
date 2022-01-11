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

  it('should post the given response data as error JSON body ', function() {
    var data = {brojVjezbi: 16, brojZadataka: [1,2,3,4] };
    var dataJson = {status:"error",data:"Pogrešan parametar brojVjezbi"};
   
    posaljiPodatke(data, function(error, result) { 
      result.should.deep.equal(dataJson);
      done();
    });
  });

  it('should parse the fetched response data as error JSON ', function(done) {
    var data = { brojVjezbi: 16, brojZadataka: [1,2,3,4] };
    var dataJson = {status:"error",data:"Pogrešan parametar brojVjezbi"};
   
    dohvatiPodatke(function(err, result) {
      result.should.deep.equal(dataJson);
      done();
    });
   
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(dataJson));
  });

  it('should post the given response data as error JSON body ', function() {
    var data = {brojVjezbi: 4, brojZadataka: [1,2,3,14] };
    var dataJson = {status:"error",data:"Pogrešan parametar z3"};
   
    posaljiPodatke(data, function(error, result) {
      result.should.deep.equal(dataJson);
      done();
     });
   
  });

  it('should parse the fetched response data as error JSON ', function(done) {
    var data = { brojVjezbi: 4, brojZadataka: [1,2,3,14] };
    var dataJson = {status:"error",data:"Pogrešan parametar brojZadataka"};
   
    dohvatiPodatke(function(err, result) {
      result.should.deep.equal(dataJson);
      done();
    });
   
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(dataJson));
  });

  it('should post the given response data as error JSON body ', function() {
    var data = {brojVjezbi: 14, brojZadataka: [1,2,3,4] };
    var dataJson = {status:"error",data:"Pogrešan parametar brojZadataka"};
   
    posaljiPodatke(data, function(error, result) { 
      result.should.deep.equal(dataJson);
      done();
    });
   
  });

  it('should parse the fetched response data as error JSON ', function(done) {
    var data = { brojVjezbi: 14, brojZadataka: [1,2,3,4] };
    var dataJson = {status:"error",data:"Pogrešan parametar brojZadataka"};
   
    dohvatiPodatke(function(err, result) {
      result.should.deep.equal(dataJson);
      done();
    });
   
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(dataJson));
  });
  
  it('should post the given response data as error JSON body ', function() {
    var data = {brojVjezbi: 16, brojZadataka: [1,2,3,4,5,6,17] };
    var dataJson = {status:"error",data:"Pogrešan parametar brojVjezbi,z6"};

    posaljiPodatke(data, function(error, result) { 
      result.should.deep.equal(dataJson);
      done();
    });
  });

  it('should post the given response data as JSON body ', function() {
    var data = {brojVjezbi: 4, brojZadataka: [1,2,3,4] };
    var dataJson = JSON.stringify(data);
    posaljiPodatke(data, function(error, data) {});
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


  it('should return an error into the callback for get ', function(done) {
    dohvatiPodatke(function(err, result) {
      err.should.exist;
      done();
    });
   
    this.requests[0].respond(500);
  });

  it('should return an error into the callback for post ', function(done) {
    var data = { brojVjezbi: 4, brojZadataka: [1,2,3,4] };
    posaljiPodatke(data, function(err, result) {
      err.should.exist;
      done();
    });
   
    this.requests[0].respond(500);
  });

});