'use strict';

var app = require('../..');
var request = require('supertest');

var newSms;

describe('Sms API:', function() {

  describe('GET /api/smss', function() {
    var smss;

    beforeEach(function(done) {
      request(app)
        .get('/api/smss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          smss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      smss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/smss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/smss')
        .send({
          name: 'New Sms',
          info: 'This is the brand new sms!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSms = res.body;
          done();
        });
    });

    it('should respond with the newly created sms', function() {
      newSms.name.should.equal('New Sms');
      newSms.info.should.equal('This is the brand new sms!!!');
    });

  });

  describe('GET /api/smss/:id', function() {
    var sms;

    beforeEach(function(done) {
      request(app)
        .get('/api/smss/' + newSms._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          sms = res.body;
          done();
        });
    });

    afterEach(function() {
      sms = {};
    });

    it('should respond with the requested sms', function() {
      sms.name.should.equal('New Sms');
      sms.info.should.equal('This is the brand new sms!!!');
    });

  });

  describe('PUT /api/smss/:id', function() {
    var updatedSms

    beforeEach(function(done) {
      request(app)
        .put('/api/smss/' + newSms._id)
        .send({
          name: 'Updated Sms',
          info: 'This is the updated sms!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSms = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSms = {};
    });

    it('should respond with the updated sms', function() {
      updatedSms.name.should.equal('Updated Sms');
      updatedSms.info.should.equal('This is the updated sms!!!');
    });

  });

  describe('DELETE /api/smss/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/smss/' + newSms._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sms does not exist', function(done) {
      request(app)
        .delete('/api/smss/' + newSms._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
