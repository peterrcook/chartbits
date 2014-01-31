(function() {

"use strict";

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.radialPoints = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    majorRadius: 100,
    pointRadius: 5,
    fadeRate: 0,
    color: 'black'
  }




  /*----
  Internal variables
  ----*/
  var constructed = false;
  var data = null;
  var d3elements = {
    container: null,
    points: null
  }


  /*-----
  Helpers
  -----*/
  function degToRad(d) {return d * Math.PI / 180;}



  /*----
  Chart building
  ----*/
  function constructChart() {
    d3elements.points = d3elements.container
      .selectAll('circle')
      .data(function(d) {return d;})
      .enter()
      .append('circle');
  }



  /*----
  Update
  ----*/
  function update() {
    d3elements.points
      .attr('r', config.pointRadius)
      .attr('cx', function(d) {return config.majorRadius * Math.sin(degToRad(d));})
      .attr('cy', function(d) {return -config.majorRadius * Math.cos(degToRad(d));})
      .style('opacity', function(d, i) {return 1 - (config.fadeRate * i);});
  }



  /*----
  Main chart function
  ----*/
  function chart(selection) {
    // console.log('selection', selection);

    // To make things simpler, we assume just one element in the selection
    d3elements.container = d3.select(selection[0][0]);
    data = d3elements.container.datum();

    // console.log(data);

    // Construct the chart if this is first call
    if(!constructed) {
      constructChart();
    }

    update();

    constructed = true;
  }



  /*----
  Configuration getters/setters
  -----*/
  d3.keys(config).forEach(function(a) {
    chart[a] = function(_) {
      if(!arguments.length) return config[a];
      config[a] = _;
      return chart;
    }
  });

  return chart;
}

})();