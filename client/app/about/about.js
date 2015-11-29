'use strict';

angular.module('smsAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutController',
        controllerAs: 'about'
      });
  });
