'use strict';

angular.module('smsAppApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    }, {
      'title': "Price",
      'state': 'price'
    }, {
      'title': 'Team',
      'state': 'team'
    },{
      'title': 'About',
      'state': 'about'
    }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
