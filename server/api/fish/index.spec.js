'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var fishCtrlStub = {
  index: 'fishCtrl.index',
  show: 'fishCtrl.show',
  create: 'fishCtrl.create',
  update: 'fishCtrl.update',
  destroy: 'fishCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var fishIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './fish.controller': fishCtrlStub
});

describe('Fish API Router:', function() {

  it('should return an express router instance', function() {
    fishIndex.should.equal(routerStub);
  });

  describe('GET /api/fish', function() {

    it('should route to fish.controller.index', function() {
      routerStub.get
        .withArgs('/', 'fishCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/fish/:id', function() {

    it('should route to fish.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'fishCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/fish', function() {

    it('should route to fish.controller.create', function() {
      routerStub.post
        .withArgs('/', 'fishCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/fish/:id', function() {

    it('should route to fish.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'fishCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/fish/:id', function() {

    it('should route to fish.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'fishCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/fish/:id', function() {

    it('should route to fish.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'fishCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
