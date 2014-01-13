(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.connectedLabels = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    connectorSide: 'left',  // the side of the labels the connector emanates from
    fontSize: 12,
    position: {x: 0, y: 0},  // the position of the labels relative to the container
    labelWidth: 200
  }




  /*----
  Internal variables
  ----*/
  var constructed = false;
  var d3elements = {
    container: null,
    groups: null,
    svgLayer: null,
    divLayer: null,
    labelContainer: null,
  }


  /*-----
  Helpers
  -----*/
  function labelList(l) {
    l = _.map(l, function(v) {
      return '<span class="label-'+v+'">' + v + '</span>';
    });
    l = l.join(', ');
    return l;
  }


  /*----
  Chart building
  ----*/
  function constructChart() {
    d3elements.labelContainer = d3elements.divLayer
      .append('div')
      .classed('labels', true)
      .style('position', 'absolute')
      .style('width', config.labelWidth + 'px')
      .style('left', config.connectorSide === 'left' ? config.position.x + 'px' : config.position.x - config.labelWidth + 'px')
      // .style('text-align', config.connectorSide === 'left' ? 'left' : 'right')
      .style('top', config.position.y + 'px')
  }



  /*----
  Update
  ----*/
  function connectorPath(d, i) {
    var labelY = config.position.y + (i + 0.5) * (config.fontSize + 4);
    p = animdata.svg.pathAbsMove(config.position.x, labelY);
    p += animdata.svg.pathAbsLine(d.position.x, labelY);
    p += animdata.svg.pathAbsLine(d.position.x, d.position.y);
    return p;
  }

  function update() {
    var labelGroups = d3elements.labelContainer
      .selectAll('div.label-group')
      .data(function(d) {return d;})
      .enter()
      .append('div')
      .style('position', 'absolute')
      .style('right', config.connectorSide === 'right' ? 0 : null)
      .style('top', function(d, i) {return i * (config.fontSize + 4) + 'px';})
      .style('font-size', config.fontSize + 'px')
      .attr('class', function(d, i) {return 'label-group group-'+i;})
      // .classed('label-group', true);

    labelGroups
      .html(function(d) {return labelList(d.labels);});

    d3elements.svgLayer
      .selectAll('path.connector')
      .data(function(d) {return d;})
      .enter()
      .append('path')
      .classed('connector', true)
      .style('fill', 'none')
      .attr('d', connectorPath);

    // d3elements.points
    //   .attr('r', config.pointRadius)
    //   .attr('cx', function(d) {return config.majorRadius * Math.sin(degToRad(d));})
    //   .attr('cy', function(d) {return -config.majorRadius * Math.cos(degToRad(d));})
    //   .style('opacity', function(d, i) {return 1 - (config.fadeRate * i);});
  }



  /*----
  Main chart function
  ----*/
  function chart(selection) {
    // console.log('selection', selection);

    // To make things simpler, we assume just one element in the selection
    d3elements.container = d3.select(selection[0][0]);
    d3elements.divLayer = d3elements.container.select('div.layer');
    d3elements.svgLayer = d3elements.container.select('svg.layer');

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