/* (C) 2014 Peter Cook */

(function() {

"use strict";

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.quartersAxis = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    axisLength: 500,
    numQuarters: 6,
    startQuarter: null, // 1, 2, 3 or 4
    startYear: null, // e.g. 2010
    label: 'Label',
    labelColor: '#666',
    lineColor: '#aaa',
    fontSize: 11,
    centerLabels: true,
    justYears: false
  }




  /*----
  Internal variables
  ----*/
  var constructed = false;

  var d3elements = {
    container: null,
  }

  var axisComponent = null;
  var quarterFormat = null;


  /*----
  Chart building
  ----*/
  function construct() {
    quarterFormat = function(d) {
      var q = +((d - 1) % 4 + 1);
      if(config.justYears && q !== 1)
        return '';
      return 'Q' + q;
    };
  }



  /*----
  Update
  ----*/
  function update() {
    var domainEnd = config.startQuarter + config.numQuarters;
    if(!config.centerLabels)
      domainEnd--;

    var scale = d3.scale.linear()
      .domain([config.startQuarter, domainEnd])
      .range([0, config.axisLength]);

    var tickValues = [];
    for(var i=0; i<config.numQuarters; i++)
      tickValues.push(config.startQuarter + i);

    var xStep = config.axisLength / config.numQuarters;

    var axisComponent = d3.svg.axis()
      .scale(scale)
      .orient('bottom')
      .tickValues(tickValues)
      .tickFormat(quarterFormat);
    d3elements.container
      .call(axisComponent);


    // Move tick label to center
    if(config.centerLabels) {
      d3elements.container
        .selectAll('.tick text')
        .attr('x', xStep * 0.5);
    }

    // Years
    var years = [];
    var year = config.startYear;
    var quarter = config.startQuarter;
    for(var i=0; i<config.numQuarters; i++) {
      years.push(quarter === 1 ? year : '');
      quarter++;
      if(quarter === 5) {
        quarter = 1;
        year++;
      }
    }
    d3elements.container
      .selectAll('.tick')
      .append('text')
      .classed('year', true)
      .attr('x', function(d, i) {return config.centerLabels ? 0.5 * xStep : 0;})
      .attr('y', 32)
      .style('text-anchor', 'middle')
      .text(function(d, i) {return years[i];});

    // Years
    // var years = [];
    // for(var i=0; i<=Math.floor((config.numQuarters - 1) / 4); i++) {
    //   years.push(config.startYear + i);
    // }
    // d3elements.container
    //   .append('g')
    //   .classed('years', true)
    //   .attr('transform', animdata.svg.translate(0, 35))
    //   .selectAll('text')
    //   .data(years)
    //   .enter()
    //   .append('text')
    //   .attr('x', function(d, i) {return (i * 4 + 0.5) * xStep;})
    //   .style('font-size', config.fontSize)
    //   .style('text-anchor', 'middle')
    //   .style('font-weight', 'bold')
    //   .text(function(d) {return d;});

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
    d3elements.container
      .selectAll('.tick line')
      .style('stroke-width', function(d, i) {return (d - 1) % 4 === 0 ? 3 : 1;});
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