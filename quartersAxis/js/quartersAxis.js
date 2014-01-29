/* (C) 2014 Peter Cook */

(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.quartersAxis = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    length: 500,
    numQuarters: 11,
    startQuarter: 1,
    startYear: 2010,
    label: 'Label',
    lineColor: '#aaa',
    fontSize: 11
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
      return 'Q' + +((d - 1) % 4 + 1);
    };
  }



  /*----
  Update
  ----*/
  function update() {
    var scale = d3.scale.linear()
      .domain([0, config.numQuarters])
      .range([0, config.length]);

    var tickValues = [];
    for(var i=0; i<config.numQuarters; i++)
      tickValues.push(i+1);

    var xStep = config.length / config.numQuarters;

    var axisComponent = d3.svg.axis()
      .scale(scale)
      .orient('bottom')
      .tickValues(tickValues)
      .tickFormat(quarterFormat);
    d3elements.container
      .call(axisComponent);


    // Move tick label to center
    d3elements.container
      .selectAll('.tick text')
      .attr('x', -xStep * 0.5);

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
      .style('font-size', config.fontSize)


    // Years
    var years = [];
    for(var i=0; i<=Math.floor((config.numQuarters - 1) / 4); i++) {
      years.push(config.startYear + i);
    }
    d3elements.container
      .append('g')
      .classed('years', true)
      .attr('transform', animdata.svg.translate(0, 35))
      .selectAll('text')
      .data(years)
      .enter()
      .append('text')
      .attr('x', function(d, i) {return (i * 4 + 0.5) * xStep;})
      .style('font-size', config.fontSize)
      .style('text-anchor', 'middle')
      .style('font-weight', 'bold')
      .text(function(d) {return d;});
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