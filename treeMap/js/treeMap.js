(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.treeMap = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    color: function(d, i) {return ['indianred', 'steelblue'][i % 2];},
    width: 200,
    height: 200,
    labels: true,
    labelSize: 10,
    labelPadding: 10, 
    padding: 0,
    value: function(d) {return d.size;}, // value function
    sticky: false,
  }




  /*----
  Internal variables
  ----*/
  var constructed = false;
  var data = null;
  var colorScale = null;
  var treeMaps = null; // The treemap functions

  var d3elements = {
    container: null,
    treeMaps: null,
  }


  /*----
  Chart building
  ----*/
  function constructChart() {
    // We'll use div elements, as it's much easier to center the text
    // e.g. http://stackoverflow.com/questions/9192389/css-single-or-multiple-line-vertical-align
    d3elements.treeMaps = d3elements.container
      .selectAll('div.treemap')
      .data(data)
      .enter()
      .append('div')
      .classed('treemap', true)
      .style('position', 'absolute');
  }

  function position(d, i) {
    var totalLabelPadding = 2 * config.labelPadding;

    // Only include label padding if the element width is bigger than the label padding
    var doLabelPadding = d.dx > totalLabelPadding && d.dy > totalLabelPadding + config.labelSize;

    var width = d.dx - config.padding;
    var height = d.dy - config.padding;
    var labelPadding = 0;

    if(doLabelPadding) {
      width -= totalLabelPadding;
      height -= totalLabelPadding;
      labelPadding = config.labelPadding;
    }

    d3.select(this)
        .style('left', d.x + 'px')
        .style('top', d.y + 'px')
        .style('width', width + 'px')
        .style('height', height + 'px')
        .style('padding', labelPadding + 'px');
  }



  /*----
  Update
  ----*/
  function updateTreeMap(d, i) {
    var u = d3.select(this)
      .selectAll('div.node')
      .data(treeMaps[i].nodes, function(d) {return d.name;});

    var nodes = u.enter()
      .append('div')
      .classed('node', true)

    nodes
      .append('p')
      .style('display', 'table-cell')
      .style('vertical-align', 'middle')
      .style('text-align', 'center')
      .style('font-size', config.labelSize + 'px');

    u.exit()
      .remove();

    u.style('display', function(d, i) {return i === 0 ? 'none' : 'table';})  // table used for text centering
      .style('background-color', function(d, i) {return config.color(d, i);})
      .style('position', 'absolute')
      .each(position);

    u.select('p')
      .text(function(d) {
        return config.labels ? d.name : '';
    });

    // Measure size to check that label isn't too long
    u.select('p')
      .text(function(d) {
        var height = this.clientHeight + 2 * config.labelPadding + config.padding;
        var width = this.clientWidth + 2 * config.labelPadding + config.padding;
        if(height > d.dy || width > d.dx)
          return '';
        return config.labels ? d.name : '';
      });
  }

  function update() {
    treeMaps = _.map(data, function(d, i) {
      return d3.layout.treemap()
        .size([
          config.width.length === undefined ? config.width : config.width[i],
          config.height.length === undefined ? config.height : config.height[i]
        ])
        .padding(config.padding)
        .value(config.value);
    });

    d3elements.treeMaps
      .each(updateTreeMap);
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