'use strict';

angular.module('smsAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('price', {
        url: '/price',
        templateUrl: 'app/price/price.html',
        controller: 'PriceController',
        controllerAs: 'price'
      });
  });
