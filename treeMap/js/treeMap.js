(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = {};

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
    labelSize: 12,
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
    d3elements.treeMaps = d3elements.container
      .selectAll('g.treemap')
      .data(data)
      .enter()
      .append('g')
      .classed('treemap', true);
  }

  function position() {
    this.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.dx - config.padding; })
        .attr("height", function(d) { return d.dy - config.padding; });
  }

  function labelPosition(d, i) {
    this.attr("x", function(d) { return d.x + 0.5 * d.dx; })
        .attr("y", function(d) { return d.y + 0.5 * d.dy + 0.35 * config.labelSize; });
  }



  /*----
  Update
  ----*/
  function updateTreeMap(d, i) {
    var u = d3.select(this)
      .selectAll('g.node')
      .data(treeMaps[i].nodes, function(d) {return d.name;});

    var e = u.enter()
      .append('g')
      .classed('node', true);

    e.append('rect');
    if(config.labels)
      e.append('text');

    u.exit()
      .remove();

    u.select('g.node rect')
      .style('display', function(d, i) {return i === 0 ? 'none' : 'block';})
      .style('fill', function(d, i) {return config.color(d, i);})
      .call(position);
  }

  function updateLabels(d, i) {
    if(!config.labels) return;

    d3.select(this)
      .selectAll('g.node text')
      .text(function(d) {return d.name;})
      .style('text-anchor', 'middle')
      .style('font-size', config.labelSize + 'px')
      .call(labelPosition);
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

    d3elements.treeMaps
      .each(updateLabels)
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