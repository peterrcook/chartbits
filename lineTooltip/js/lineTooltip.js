/* (C) 2014 Peter Cook */

(function() {

"use strict";

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.lineTooltip = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    svgOffset: {x: 0, y: 0}, // offset of the svg container wrt the div container - might be a better way to do this...
    offset: {x: 10, y: 10},
    width: 200,
    xStep: 150,
    domain: [-10, 10],
    range: [0, 400],
    colors: null,
    seriesNames: [],
    seriesVisible: null,
    unit: ''
  }



  /*----
  Internal variables
  ----*/
  var d3elements = {
    container: null,
    tooltip: null,
    marker: null
  }

  var uiState = {
    i: null
  }

  var template = null;
  var constructed = false;
  var data = null;
  var xScale = null;
  var yScale = null;

  /*------------
  Initialisation
  ------------*/
  function init(s) {
    // To make things simpler, we assume just one element in the selection
    d3elements.container = d3.select(s[0][0]);

    data = d3elements.container.datum();

    d3elements.tooltip = d3elements.container
      .select('div.tooltip');

    xScale = d3.scale.linear().domain([0, data[0].length - 1]).range([0, (data[0].length - 1) * config.xStep]);
    yScale = d3.scale.linear().domain(config.domain).range([config.range[1], config.range[0]]);

    constructTooltip();
    constructMarkers();
  }

  /*----
  Construction
  ----*/
  function constructTooltip() {
    d3elements.tooltip = d3elements.container
      .append('div')
      .classed('tooltip', true)
      .style('position', 'absolute')
      .style('opacity', 0)
      .style('width', config.width + 'px');

    d3elements.tooltip
      .selectAll('div')
      .data(data)
      .enter()
      .append('div')
      .style('color', function(d, i) {return config.colors ? config.colors[i] : 'black';});
      // .style('pointer-events', config.allowPointerEvents); //ie9 doesn't like this
  }

  function constructMarkers() {
    d3elements.markers = d3elements.container
      .select('svg')
      .append('g')
      .classed('markers', true);

    d3elements.markers
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 3)
      .style('fill', 'none')
      .style('stroke', function(d, i) {return config.colors[i];})
      .style('stroke-width', '1px');

    d3elements.markers
      .append('line')
      .attr('y1', yScale.range()[0])
      .attr('y2', yScale.range()[1]);
  }

  function addEvents() {
    d3elements.container
      .on('mousemove.tooltipComponent', function(d) {
        updatePosition();
        updateMarkers();
        updateContent();
        updateVisibility();
      });

    d3elements.container
      .on('mouseover.tooltipComponent', function(d) {
        updatePosition();
        updateContent();
        updateVisibility();
      })
      .on('mouseout.tooltipComponent', function() {
        uiState.i = null;
        updateVisibility();
      });
  }



  /*----
  Update
  ----*/
  function updateVisibility() {
    d3elements.tooltip
      .transition()
      .style('opacity', uiState.i === null ? 0 : 1);

    d3elements.markers
      .transition()
      .style('opacity', uiState.i === null ? 0 : 1);
  }

  function updatePosition() {
    var container = d3elements.container[0][0];
    var pos = d3.mouse(container);

    uiState.i = Math.round(xScale.invert(pos[0] - config.svgOffset.x));

   // console.log(uiState.i);

    if(uiState.i < 0 || uiState.i >= data[0].length) {
      uiState.i = null;
      updateVisibility();
      return;
    }

    var x = xScale(uiState.i) + config.offset.x + config.svgOffset.x;
    var containerWidth = container.clientWidth;

    // Adjust tooltip position depending on which container quadrant we're in
    if(x > 0.5 * containerWidth) {
      var tooltipWidth = d3elements.tooltip[0][0].clientWidth;
      x -= tooltipWidth + 2 * config.offset.x;
    }

    d3elements.tooltip
      .style('left', x + 'px')
      .style('top', config.offset.y + 'px');
  }

  function updateMarkers() {
    if(uiState.i === null)
      return;

    d3elements.markers
      .selectAll('circle')
      .attr('cx', xScale(uiState.i) + config.svgOffset.x)
      .attr('cy', function(d, series) {
        return yScale(data[series][uiState.i]);
      })
      .style('opacity', function(d, i) {
        if(config.seriesVisible === null)
          return 1;
        return config.seriesVisible[i] ? 1 : 0;
      });

    d3elements.markers
      .select('line')
      .attr('x1', xScale(uiState.i) + config.svgOffset.x)
      .attr('x2', xScale(uiState.i) + config.svgOffset.x);
  }

  function updateContent() {
    if(uiState.i === null)
      return;

    d3elements.tooltip
      .selectAll('div')
      .style('opacity', function(d, i) {
        if(config.seriesVisible === null)
          return 1;
        return config.seriesVisible[i] ? 1 : 0;
      })
      .html(function(d, i) {
        var ret = config.seriesNames[i] + ': ';
        ret += d[uiState.i];
        ret += config.unit;
        return ret;
      });
  }


  /*----
  Main chart function
  ----*/
  function chart(s) {
    if(!constructed)
      init(s);

    addEvents();

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