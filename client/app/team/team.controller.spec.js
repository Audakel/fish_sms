'use strict';

describe('Controller: TeamController', function() {

  // load the controller's module
  beforeEach(module('smsAppApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var TeamController;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    TeamController = $controller('TeamController', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the controller', function() {
    $httpBackend.flush();
    expect(TeamController.awesomeThings.length).toBe(4);
  });
});
