const express = require('express');
const bodyParser = require('body-parser');
let app = require('./index');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let assert=require('chai').assert;
let should = require('chai').should();
const db = require('./db');
const { expect } = require('chai');


describe('TestoviRutaiBaze',function(){
    var sadrzajStudent = [];
    var sadrzajGrupa = [];
    var sadrzajVjezba = [];
    var sadrzajZadatak = [];

    before(async function (){

        db.Student.sync();
        db.Grupa.sync();
        db.Vjezba.sync();
        db.Zadatak.sync();
 
        sadrzajStudent = await db.Student.findAll();
        sadrzajVjezba = await db.Vjezba.findAll();
        sadrzajGrupa = await db.Grupa.findAll();
        sadrzajZadatak = await db.Zadatak.findAll();

    });

    it('POST /student uredu',function (done) {
        
        db.Student.sync({force:true});
        db.Grupa.sync({force:true});
        db.Vjezba.sync({force:true});
        db.Zadatak.sync({force:true});
        let student = {ime: "Test1", prezime: "Testovic1", index:"1111", grupa:"Grupa1"}
        chai.request(app)
        .post('/student')
        .set('content-type','application/json')
        .send(student)
        .end(function (err,res) {
            res.should.have.status(200);
            should.not.exist(err);
            done();
        });
        
       this.timeout(10000);
    });

    it('POST /student novi student',function (done) {
        let student = {ime: "Test2", prezime: "Testovic2", index:"1112", grupa:"Grupa1"}
        chai.request(app)
        .post('/student')
        .set('content-type','application/json')
        .send(student)
        .end(function (err,res) {
            expect(res.body.status).to.equals("Kreiran student!");
            done();
        });
    });

    it('POST /student student postoji',function (done) {
        let student = {ime: "Test2", prezime: "Testovic2", index:"1111", grupa:"Grupa1"}
        chai.request(app)
        .post('/student')
        .set('content-type','application/json')
        .send(student)
        .end(function (err,res) {
            expect(res.body.status).to.equals("Student sa indexom 1111 već postoji!");
            done();
        });
    });
});

