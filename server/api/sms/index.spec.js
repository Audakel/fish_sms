'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var smsCtrlStub = {
  index: 'smsCtrl.index',
  show: 'smsCtrl.show',
  create: 'smsCtrl.create',
  update: 'smsCtrl.update',
  destroy: 'smsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var smsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sms.controller': smsCtrlStub
});

describe('Sms API Router:', function() {

  it('should return an express router instance', function() {
    smsIndex.should.equal(routerStub);
  });

  describe('GET /api/smss', function() {

    it('should route to sms.controller.index', function() {
      routerStub.get
        .withArgs('/', 'smsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/smss/:id', function() {

    it('should route to sms.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'smsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/smss', function() {

    it('should route to sms.controller.create', function() {
      routerStub.post
        .withArgs('/', 'smsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/smss/:id', function() {

    it('should route to sms.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'smsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/smss/:id', function() {

    it('should route to sms.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'smsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/smss/:id', function() {

    it('should route to sms.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'smsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
