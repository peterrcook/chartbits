/* (C) 2014 Peter Cook */

"use strict";

(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.layerMenu = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    items: [], // [{label: '', layerSelector: ''}]
    transitionDuration: 500,
    initialSelection: 0,
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

    uiState.selectedLayer = config.items[config.initialSelection].layerSelector;
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
      .style('display', 'table')
      .append('p')
      .style('display', 'table-cell')
      .style('text-align', 'center')
      .style('vertical-align', 'middle')
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
      var selected = layer === uiState.selectedLayer;

      if(selected) {
        d3.select(layer)
          .style('display', 'block')
          .transition()
          .duration(config.transitionDuration)
          .style('opacity', 1);
      } else {
        d3.select(layer)
          .transition()
          .duration(config.transitionDuration)
          .style('opacity', 0)
          .each('end', function() {
            d3.select(this)
              .style('display', 'none');
          });
      }
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