/* (C) 2014 Peter Cook */

(function() {

"use strict";

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.yearsAxis = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    axisLength: 500,
    numYears: 10,
    startYear: null, // e.g. 2010
    label: 'Label',
    labelColor: '#666',
    lineColor: '#aaa',
    fontSize: 11,
    centerLabels: false
  }



  /*----
  Internal variables
  ----*/
  var constructed = false;

  var d3elements = {
    container: null,
  }

  var axisComponent = null;
  var yearFormat = null;


  /*----
  Chart building
  ----*/
  function construct() {
    yearFormat = function(d) {
      return d;
    };
  }



  /*----
  Update
  ----*/
  function update() {
    var domainEnd = config.startYear + config.numYears;
    if(!config.centerLabels)
      domainEnd--;

    var scale = d3.scale.linear()
      .domain([config.startYear, domainEnd])
      .range([0, config.axisLength]);

    var tickValues = [];
    for(var i=0; i<config.numYears; i++)
      tickValues.push(config.startYear + i);

    var xStep = config.axisLength / config.numYears;

    var axisComponent = d3.svg.axis()
      .scale(scale)
      .orient('bottom')
      .tickValues(tickValues)
      .tickFormat(yearFormat);

    d3elements.container
      .call(axisComponent);


    // Move tick label to center
    if(config.centerLabels) {
      d3elements.container
        .selectAll('.tick text')
        .attr('x', xStep * 0.5);
    }

    // Styling
    d3elements.container
      .selectAll('line')
      .style('stroke-width', 1)
      .style('shape-rendering', 'crispEdges')
      .style('stroke', config.lineColor);
    d3elements.container
      .selectAll('path')
      .style('stroke-width', 1)
      .style('stroke', config.lineColor)
      .style('shape-rendering', 'crispEdges')
      .style('fill', 'none');
    d3elements.container
      .selectAll('text')
      .style('font-size', config.fontSize + 'px')
      .style('fill', config.labelColor);
  }



  /*----
  Main chart function
  ----*/
  function chart(selection) {
    // console.log('selection', selection);

    // To make things simpler, we assume just one element in the selection
    d3elements.container = d3.select(selection[0][0]);

    // console.log(data);

    // Construct the chart if this is first call
    if(!constructed) {
      construct();
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