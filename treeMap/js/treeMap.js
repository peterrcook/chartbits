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
    // labelPadding: 0, // disable for now - requires further thought with regards negative widths in position()
    labelDisplayThreshold: 150, // if area / num. chars > threshold, display the label
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

  function position() {
    this.style('left', function(d) { return d.x + 'px'; })
        .style('top', function(d) { return d.y + 'px'; })
        .style('width', function(d) { return d.dx - config.padding + 'px'; })
        .style('height', function(d) { return d.dy - config.padding + 'px'; })
        // .style('padding', config.labelPadding + 'px');
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
      .style('text-align', 'center');

    u.exit()
      .remove();

    u.style('display', function(d, i) {return i === 0 ? 'none' : 'table';})  // table used for text centering
      .style('background-color', function(d, i) {return config.color(d, i);})
      .style('position', 'absolute')
      .call(position);

    u.select('p')
      .text(function(d) {
        var area = (d.dx - config.padding /*- 2 * config.labelPadding*/) * (d.dy - config.padding /*- 2 * config.labelPadding*/);
        var enoughSpace = false;
        if(d.name !== undefined) {
          enoughSpace = area / d.name.length > config.labelDisplayThreshold;
        }
        return config.labels && enoughSpace ? d.name : '';
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