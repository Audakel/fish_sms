'use strict';
(function() {

function MainController($scope, $http, $filter, socket) {
  var self = this; 
  this.awesomeThings = [];

  $http.get('/api/sms').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('sms', self.awesomeThings);
  });

  this.catfish = this.awesomeThings;

  $scope.calculateTotal = function(list, fish, operator){
   // calculate total
   var _list = $filter('filter')(list, { fish: fish });  


   if (operator === "buy"){
      return $scope.buySellSort("buy",_list);
   }

   if (operator === "sell"){
       return $scope.buySellSort("sell", _list);
   }

   if (operator === "needed"){
      var needed = 0;
      for(var i = 0; i < _list.length; i++){
          if (_list[i].buysell === "buy"){
            needed += _list[i].quantity;
          }
          else {
            needed -= _list[i].quantity;
          }
        }
      return needed;
   }
  }

  $scope.buySellSort = function(buysell, _list) {
       var count = 0;
        var sum=0;
        
        var s_list = $filter('filter')(_list, { buysell: buysell }); 
        for(var i = 0; i < s_list.length; i++){
          sum +=s_list[i].price
          count += 1;
        }
    return sum/count;
  }




  $scope.fish = [{
      name: 'bass',
      buy: 45,
      sell: 43,
      amount: 2,
      pic: "assets/images/tuna.png"
    }, {
      name: 'mojarra',
      buy: 25,
      sell: 29,
      amount: 5,
      pic: "assets/images/bass.png"

    }, {
      name: 'flounder',
      pic: "assets/images/beta.png"

  }]; 




  this.addThing = function() {
    $http.post('/api/sms', {
      number: "123",
      buysell: "parts[0]",
      quantity: 13,
      fish: "parts[2]",
      price: 12
    });
    self.newThing = '';
  };

  this.deleteThing = function(thing) {
    $http.delete('/api/sms/' + thing._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('thing');
  });
}

angular.module('smsAppApp')
  .controller('MainController', MainController);

})();
