/* (C) 2014 Peter Cook */

(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.layerMenu = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    items: []
  }



  /*----
  Internal variables
  ----*/
  var d3elements = {
    container: null,
  }

  var uiState = {
    selectedLayer: 0
  }



  /*------------
  Initialisation
  ------------*/
  function init(s) {
    // To make things simpler, we assume just one element in the selection
    d3elements.container = d3.select(s[0][0]);

    uiState.selectedLayer = config.items[0].layerSelector;
  }



  /*----
  Construction
  ----*/
  function constructMenu() {
    d3elements.container
      .selectAll('div.item')
      .data(config.items)
      .enter()
      .append('div')
      .classed('item', true)
      .style('cursor', 'pointer')
      .text(function(d) {return d.label;});
  }

  function construct() {
    constructMenu();
  }

  function addEvents() {
    d3elements.container
      .selectAll('div.item')
      .on('click', function(d) {
        uiState.selectedLayer = d.layerSelector;
        update();
      });
  }



  /*----
  Update
  ----*/
  function update() {
    config.items.forEach(function(item) {
      var layer = item.layerSelector;
      console.log(layer, uiState.selectedLayer);
      d3.select(layer)
        .transition()
        .style('opacity', layer === uiState.selectedLayer ? 1 : 0)
    });

    // update menu
    d3elements.container
      .selectAll('div.item')
      .classed('selected', function(d) {return d.layerSelector === uiState.selectedLayer;});
  }


  /*----
  Main chart function
  ----*/
  function chart(s) {
    init(s);

    // console.log('selection', d3elements.container);

    construct();
    addEvents();
    update();
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