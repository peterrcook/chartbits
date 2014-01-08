(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.heatGrid = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    width: 10,
    padding: 1,
    transpose: false,
    domain: [0,1],
    range: ['white', 'steelblue']
  }




  /*----
  Internal variables
  ----*/
  var constructed = false;
  var data = null;
  var colorScale = null;

  var d3elements = {
    container: null,
    grids: null,
    rows: null,
  }


  /*----
  Chart building
  ----*/
  function constructChart() {
    d3elements.grids = d3elements.container
      .selectAll('g.grid')
      .data(data)
      .enter()
      .append('g')
      .classed('grid', true);

    d3elements.rows = d3elements.grids
      .selectAll('g.row')
      .data(function(d) {return d;})
      .enter()
      .append('g')
      .classed('row', true);

    var width = config.width + config.padding;
    d3elements.rows
      .selectAll('rect')
      .data(function(d) {return d;})
      .enter()
      .append('rect')
      .attr({'width': config.width, 'height': config.width})
      .attr('x', function(d, i, j) {return config.transpose ? j * width : i * width;})
      .attr('y', function(d, i, j) {return config.transpose ? i * width : j * width;})
  }



  /*----
  Update
  ----*/
  function updateScales() {
    colorScale = d3.scale.linear().domain(config.domain).range(config.range);
  }


  /*----
  Chart update (D3 stuff)
  ----*/
  function updateChart() {
    d3elements.rows
      .selectAll('rect')
      .style('fill', function(d) {return colorScale(d);});
  }

  function update() {
    updateScales();
    updateChart();
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