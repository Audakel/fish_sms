'use strict';

angular.module('smsAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('team', {
        url: '/team',
        templateUrl: 'app/team/team.html',
        controller: 'TeamController',
        controllerAs: 'team'
      });
      
  });
