'use strict';
(function() {

function TeamController($scope, $http, socket) {
  var self = this; 
  $scope.teamMembers = [{
      name: 'Austin',
      about: 'Used Redis + Memcached + Node.js + Go + MongoDB + MariaDB + postgres + Clojure to help scale his fishing start-up (from 10 to 20 hits per day) ಠ_ರೃ',
      pic: "assets/images/audakel.png"
    }, {
      name: 'Cole',
      about: 'Creater of fshng.js. His post "Why Go Is Better Than You And Everything You Own And Why It Always Will Be" was featured on the front page of NYT at #2 spot',
      pic: "assets/images/cole.png"

    }, {
      name: 'Matt',
      about: 'More details on matt',
      pic: "assets/images/matt.png"

    }];

  // $scope.teamMembers = [
  //   {
  //     name: "Austin", 
  //     about: "Used Redis+Memcached+Node.js+Go+MongoDB+MariaDB+
  //              postgres+Clojure to help scale my fishing start-up
  //               (from 10 to 20 hits per day) ಠ_ರೃ"
  //   },
  //   {
  //     name: "Cole",
      // about: "Creater of fshng.js, post 'Why Go Is Better Than You 
      // And Everything You Own And Why It Always Will Be' front page of NYT at #2 spot"
  //   }
  // ];


}

angular.module('smsAppApp')
  .controller('TeamController', TeamController);

})();


