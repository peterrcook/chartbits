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
  function labelList(d) {
    var i = -1;
    l = _.map(d.labels, function(v) {
      i++;
      var ret = '';
      if(d.classes)
        ret = '<span class="label '+ d.classes[i] +'">' + v + '</span>';
      else
        ret = '<span class="label">' + v + '</span>';
      return ret;
    });
    l = l.join(', ');
    return l;
  }



  /*--
  Init
  --*/
  function init(selection) {
    // To make things simpler, we assume just one element in the selection
    d3elements.container = d3.select(selection[0][0]);
    d3elements.divLayer = d3elements.container.select('div.layer');
    d3elements.svgLayer = d3elements.container.select('svg.layer');

    data = d3elements.container.datum();
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
      .attr('class', function(d, i) {return 'label-group group-'+i;});

    labelGroups
      .html(function(d) {return labelList(d);});

    // Attach label data to span elements - a bit unorthodox, but allows us to comma-separate
    labelGroups
      .selectAll('span')
      .data(function(d) {return d.labels;});

    d3elements.svgLayer
      .selectAll('path.connector')
      .data(function(d) {return d;})
      .enter()
      .append('path')
      .attr('class', function(d, i) {
        var classes = [];
        classes.push('label-group');
        classes.push('group-'+i);

        if(d.classes)
          classes = _.union(classes, d.classes);

        return classes.join(' ');
      })
      .classed('connector', true)
      .style('fill', 'none')
      .attr('d', connectorPath);
  }



  /*----
  Main chart function
  ----*/
  function chart(selection) {
    // console.log('selection', selection);

    init(selection);
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