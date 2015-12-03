'use strict';

angular.module('smsAppApp')
  .directive('animateOnChange', function ($timeout) {
    return {
      // template: '<div></div>',
      // restrict: 'EA',
      // link: function (scope, element, attrs) {
      //   element.text('this is the animateOnChange directive');
       scope.$watch(attr.animateOnChange, function(nv,ov) {
            if (nv!=ov) {
                element.addClass('changed');
                $timeout(function() {
                    element.removeClass('changed');
                }, 1000);
            }
        });
    
      }
    };
  });
