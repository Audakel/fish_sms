'use strict';
(function() {

function PriceController($scope, $http, socket) {
  var self = this;
  this.awesomeThings = [];

  $http.get('/api/things').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('thing', self.awesomeThings);
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    $http.post('/api/things', { name: self.newThing });
    self.newThing = '';
  };

  this.deleteThing = function(thing) {
    $http.delete('/api/things/' + thing._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('thing');
  });

  // begin d3

}

angular.module('smsAppApp')
  .controller('PriceController', PriceController)
  .directive('fishvisualization', function() {
    console.log("In directive");
    var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var parse = d3.time.format('%Y-%m-%d').parse;

    var getMaxValues = function(array) {
      var values = {
        minPrice: array[0].price,
        maxPrice: array[0].price,
        minDate: array[0].date,
        maxDate: array[0].date
      };
      for(var i = 0; i < array.length; i++) {
        if(array[i].price > values.maxPrice) {
          values.maxPrice = array[i].price;
        }
        if(array[i].price < values.minPrice) {
          values.minPrice = array[i].price;
        }
        if(array[i].date > values.maxDate) {
          values.maxDate = array[i].date;
        }
        if(array[i].date < values.minDate) {
          value.minDate = array[i].date;
        }
      }
      return values;
    };

    return {
      restrict: 'E',
      scope: {
        val: '=',
        grouped: '='
      },
      link: function(scope, element, attrs) {
        var svg = d3.select(element[0]).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .style("font-family", "inherit")
          .style("font-size", "16px");

        d3.json("./data.json", function(error, data) {
          console.log(data);
          if(error) throw error;

          var typesArray = [
            {
              type: "flounder",
              color: "#00ADFF",
              values: []
            },
            {
              type: "mojarra",
              color: "#FF1935",
              values: []
            },
            {
              type: "bass",
              color: "#CCC514",
              values: []
            }
          ];

          data.lineChart.forEach(function(d) {
            d.date = parse(d.date);
            d.price = d.price;
            if(d.type == "flounder") {
              typesArray[0].values.push(d);
            }
            else if(d.type == "mojarra") {
              typesArray[1].values.push(d);
            }
            else if(d.type == "bass") {
              typesArray[2].values.push(d);
            }
          });

          data.lineChart.sort(function(a, b) {
            if(a.date < b.date) {
              return -1;
            }
            else if(a.date > b.date) {
              return 1;
            }
            return 0;
          });

          var maxValues = getMaxValues(data.lineChart);

          var xScale = d3.scale.linear().range([margin.left, width - margin.right]).domain([maxValues.minDate, maxValues.maxDate]);
          var yScale = d3.scale.linear().range([height - margin.top, margin.bottom]).domain([0, maxValues.maxPrice]);

          var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            //.tickValues(d3.time.month.range(new Date(maxValues.minDate), new Date(maxValues.maxDate)), 1)
            .tickFormat(function(d) { return d3.time.format("%m-%d")(new Date(d)); });

          var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

          var line = d3.svg.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.price); })
            .interpolate("linear");

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height - margin.bottom + 10) + ")")
            .call(xAxis);

          svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
            .style("text-anchor", "middle")
            .text("Date");

          svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin.left + ",0)")
            .call(yAxis);

          svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Price $");


          var count = 0;
          typesArray.forEach(function(singleType) {
            svg.append("path")
              .attr("d", line(singleType.values))
              .attr("stroke", singleType.color)
              .attr("stroke-width", 2)
              .attr("fill", "none");
            svg.append("text")
              .attr("transform", "translate(" + count + "," + 5 + ")")
              .attr("stroke", singleType.color)
              .text(singleType.type);
            count += 100;
          });

          /*legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform","translate(50,30)")
            .style("font-size","16px")
            .call(d3.legend);

          setTimeout(function() {
            legend
              .style("font-size", "20px")
              .attr("data-style-padding", 10)
              .call(d3.legend)
            },1000)
          });*/
        });
        scope.$watch('exp', function (newVal, oldVal) {

        });
      }
    };
  });

})();
