/* (C) 2014 Peter Cook */

(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.toolTip = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    elements: '',
    offset: {x: 10, y: 10},
    template: null,
    title: null, // if no template specified, defines the title. If not a data property, display the string
    fields: null, // if no template specified, list the specified fields
  }



  /*----
  Internal variables
  ----*/
  var d3elements = {
    container: null,
    elements: null,
    tooltip: null
  }

  var uiState = {
    position: {x: 0, y: 0},
    hoverElement: null // the element being hovered over
  }

  var template = null;


  /*------------
  Initialisation
  ------------*/
  function init(s) {
    // To make things simpler, we assume just one element in the selection
    d3elements.container = d3.select(s[0][0]);

    d3elements.elements = d3elements.container.selectAll(config.elements);

    d3elements.elements
      .style('cursor', 'pointer');

    // Compile template
    if(config.template)
      template = _.template(config.template);
  }

  /*----
  Construction
  ----*/
  function constructTooltip() {
    d3elements.tooltip = d3elements.container
      .append('div')
      .classed('tooltip', true)
      .style('position', 'absolute')
      .style('opacity', '0')
      .style('pointer-events', 'none');
  }

  function construct() {
    constructTooltip();
  }

  function addEvents() {
    d3elements.container
      .on('mousemove', function(d) {
        // if(uiState.hoverElement === null)
        //   return;

        var pos = d3.mouse(d3elements.container[0][0]);
        uiState.position.x = pos[0] + config.offset.x;
        uiState.position.y = pos[1] + config.offset.y;

        updatePosition();
      });

    d3elements.elements
      .on('mouseover', function(d) {
        uiState.hoverElement = d3.select(this);
        d3elements.tooltip
          .transition()
         .style('opacity', '1');
        updateContent();
      })
      .on('mouseout', function() {
        d3elements.tooltip
          .transition()
          .style('opacity', '0');
        uiState.hoverElement = null;
      });
  }



  /*----
  Update
  ----*/
  function updatePosition() {
    d3elements.tooltip
      .style('left', uiState.position.x + 'px')
      .style('top', uiState.position.y + 'px');
  }

  function updateContent() {
    var datum = uiState.hoverElement.datum();

    d3elements.tooltip.html('');

    if(template) {
      d3elements.tooltip
        .html(template(datum));
    } else {
      var dMap = d3.map(datum);

      // Title
      var title = config.title;

      if(dMap.has(config.title))
        title = datum[config.title];

      d3elements.tooltip
        .append('h1')
        .text(title);

      // Table of data
      if(config.fields) {
        var rows = d3elements.tooltip
          .append('table')
          .selectAll('tr')
          .data(config.fields)
          .enter()
          .append('tr');

        rows.append('td')
          .text(function(d) {return d;});
        rows.append('td')
          .text(function(d) {return datum[d];});
      }
    }
  }


  /*----
  Main chart function
  ----*/
  function chart(s) {
    init(s);

    // console.log('selection', d3elements.container);

    construct();
    addEvents();
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