/* (C) 2014 Peter Cook */

/*
Grouped bar component
Data is 2d-array with the 1st row representing the left-most layer etc.
*/

(function() {

"use strict";

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.stackedBar = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    accessor: function(d) {return d;},
    datumAccessor: function(d) {return d;},
    barWidth: 10,
    transform: {x: 11, y: 0},
    domain: null,
    range: [-50, 50],
    colors: ['steelblue', 'indianred'],
    seriesVisible: null,
    transitionDuration: 500
  }



  /*----
  Internal variables
  ----*/
  var data = null;
  var layerData = null;
  var constructed = false;
  var scale = null;

  var d3elements = {
    container: null,
    bars: null
  }



  /*----
  Chart building
  ----*/
  function constructChart() {
  }



  /*----
  Update
  ----*/
  function updateScale() {
    scale = d3.scale.linear()
      .domain(config.domain)
      .range([config.range[1], config.range[0]]);
  }


  /*----
  Chart update (D3 stuff)
  ----*/
  function barGeometry(d, i, j) {
    d = config.accessor(d);
    var x = i * config.transform.x + j * config.barWidth;
    var y = i * config.transform.y;
    var width = 0, height = 0;

    // Vertical bars
    width = config.barWidth;
    height = Math.abs(scale(0) - scale(d));

    if(d > 0) {
      y = scale(d);
    } else {
      y = scale(0);
    }

    d3.select(this)
      .transition()
      .duration(constructed ? config.transitionDuration : 0)
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height);
  }

  function update() {
    // Update data
    // updateData();
    updateScale();


    var layerUpdate = d3elements.container
      .selectAll('g.layer')
      .data(data);

    layerUpdate.enter()
      .append('g')
      .classed('layer', true);

    layerUpdate.exit()
      .remove();

    var barUpdate = layerUpdate
      .selectAll('rect')
      .data(function(d) {return d;});

    barUpdate
      .enter()
      .append('rect')
      .style('fill', function(d, i, j) {
        var numColors = config.colors.length;
        return config.colors[j % numColors];
      });

    barUpdate
      .exit()
      .remove();

    barUpdate
      .each(barGeometry);
  }



  /*----
  Main chart function
  ----*/
  function chart(selection) {
    // To make things simpler, we assume just one element in the selection
    d3elements.container = d3.select(selection[0][0]);
    data = config.datumAccessor(d3elements.container.datum());

    // console.log(data);

    // Construct the chart if this is first call
    // if(!constructed) {
    //   constructChart();
    // }

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