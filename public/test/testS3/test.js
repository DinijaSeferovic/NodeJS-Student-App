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

  it('should post the given response data as error 1 JSON body ', function() {
    var data = {brojVjezbi: 16, brojZadataka: [1,2,3,4] };
    var dataJson = {status:"error",data:"Pogrešan parametar brojVjezbi"};
   
    posaljiPodatke(data, function(error, result) { 
      result.should.deep.equal(dataJson);
      done();
    });
  });

  it('should parse the fetched response data as error 1 JSON ', function(done) {
    var data = { brojVjezbi: 16, brojZadataka: [1,2,3,4] };
    var dataJson = {status:"error",data:"Pogrešan parametar brojVjezbi"};
   
    dohvatiPodatke(function(err, result) {
      result.should.deep.equal(dataJson);
      done();
    });
   
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(dataJson));
  });

  it('should post the given response data as error 2 JSON body ', function() {
    var data = {brojVjezbi: 4, brojZadataka: [1,2,3,14] };
    var dataJson = {status:"error",data:"Pogrešan parametar z3"};
   
    posaljiPodatke(data, function(error, result) {
      result.should.deep.equal(dataJson);
      done();
     });
   
  });

  it('should parse the fetched response data as error 2 JSON ', function(done) {
    var data = { brojVjezbi: 4, brojZadataka: [1,2,3,14] };
    var dataJson = {status:"error",data:"Pogrešan parametar brojZadataka"};
   
    dohvatiPodatke(function(err, result) {
      result.should.deep.equal(dataJson);
      done();
    });
   
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(dataJson));
  });

  it('should post the given response data as error 3 JSON body ', function() {
    var data = {brojVjezbi: 14, brojZadataka: [1,2,3,4] };
    var dataJson = {status:"error",data:"Pogrešan parametar brojZadataka"};
   
    posaljiPodatke(data, function(error, result) { 
      result.should.deep.equal(dataJson);
      done();
    });
   
  });

  it('should parse the fetched response data as error 3 JSON ', function(done) {
    var data = { brojVjezbi: 14, brojZadataka: [1,2,3,4] };
    var dataJson = {status:"error",data:"Pogrešan parametar brojZadataka"};
   
    dohvatiPodatke(function(err, result) {
      result.should.deep.equal(dataJson);
      done();
    });
   
    this.requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(dataJson));
  });
  
  it('should post the given response data as error 4 JSON body ', function() {
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

  it('should add input fields with dodajInputPolja', function(done) {
    let zadaciField = document.getElementById("unesiZadatkeField");
    dodajInputPolja(zadaciField,4);

    zadaciField.childNodes.should.exist;
    zadaciField.childNodes.length.should.deep.equal(9);
    zadaciField.childNodes[1].value.should.deep.equal('4'); 
    zadaciField.childNodes[zadaciField.childNodes.length-1].value.should.deep.equal('Pošalji'); 
    document.getElementById("z0").should.exist;
    document.getElementById("z1").should.exist;
    document.getElementById("z2").should.exist;
    document.getElementById("z3").should.exist;
    document.getElementById("posalji").should.exist;
    document.getElementsByTagName("label").should.exist; 
    document.getElementsByTagName("input").should.exist; 
    document.getElementsByTagName("input").should.exist; 
    done();
   
  });

  it('should add vjezbe fields with iscrtajVjezbe', function(done) {
    let vjezbeField = document.getElementById("vjezbeField");
    iscrtajVjezbe(vjezbeField, {brojVjezbi: 4, brojZadataka: [4,4,4,1]});

    vjezbeField.childNodes.should.exist;
    vjezbeField.childNodes.length.should.deep.equal(4);
    document.getElementById("vjezba1").should.exist;
    document.getElementById("vjezba2").should.exist;
    document.getElementById("vjezba3").should.exist;
    document.getElementById("vjezba4").should.exist;
    document.getElementsByClassName("vjezbabtn").should.exist;
    document.getElementsByClassName("vjezbabtn").length.should.deep.equal(4);
    document.getElementsByTagName("button").should.exist; 
    done();
   
  });

  it('should add zadaci fields with iscrtajZadatke', function(done) {
    let vjezbaField = document.getElementById("vjezba1");
    iscrtajZadatke(vjezbaField, 4 );

    vjezbaField.childNodes.should.exist;
    vjezbaField.childNodes.length.should.deep.equal(2);
    document.getElementsByClassName("zadaci").should.exist;
    document.getElementById("zadaci1").should.exist;
    document.getElementById("zadaci1").childNodes.length.should.deep.equal(4);
    document.getElementById("zadaci1").parentNode.id.should.deep.equal("vjezba1");
    document.getElementsByClassName("zadatakbtn").should.exist;
    document.getElementsByClassName("zadatakbtn").length.should.deep.equal(4);
    document.getElementsByTagName("button").should.exist;
    done();
   
  });

});