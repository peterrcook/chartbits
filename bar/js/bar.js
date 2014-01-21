/* (C) 2014 Peter Cook */
(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.bar = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    barWidth: 10,
    transform: {x: 11, y: 0},
    orientation: 'vertical',
    domain: null,
    domains: null,  // allows different domain for each data point
    range: [-50, 50]
  }



  /*----
  Internal variables
  ----*/
  var data = null;
  var constructed = false;
  var scale = null;
  var scales = null;

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
  function updateScales() {
  }


  /*----
  Chart update (D3 stuff)
  ----*/
  function barGeometry(d, i) {
    if(config.orientation === 'horizontal') {
      var x = i * config.transform.x;
      var y = i * config.transform.y;
      var width = 0;
      if(!isNaN(d)) {
        if(scale)
          width = Math.abs(scale(d));
        else if(scales)
          width = Math.abs(scales[i](d));
      }

      if(d < 0)
        x -= width;
    } else {

    }

    d3.select(this)
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', config.barWidth);
  }

  function update() {

    if(config.domain)
      scale = d3.scale.linear().domain(config.domain).range(config.range);
    else if(config.domains)
      scales = _.map(config.domains, function(d) {
        return d3.scale.linear().domain(d).range(config.range);
      });

    var u = d3elements.container
      .selectAll('rect')
      .data(data);

    u.enter()
      .append('rect');

    u.exit()
      .remove();

    u.each(barGeometry);
  }



  /*----
  Main chart function
  ----*/
  function chart(selection) {
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