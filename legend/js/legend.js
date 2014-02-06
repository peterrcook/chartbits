/* (C) 2014 Peter Cook */

(function() {

"use strict";

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.legend = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    size: 14,
    dispatch: null,
    clickEvent: ''
  }




  /*----
  Internal variables
  ----*/
  var constructed = false;
  var data = null;

  var d3elements = {
    container: null,
  }


  /*----
  Chart building
  ----*/
  function construct() {
  }



  /*----
  Update
  ----*/
  function update() {
    var u = d3elements.container
      .selectAll('div.item')
      .data(data);

    u.enter()
      .append('div')
      .classed('item', true)
      .style('float', 'left')
      .style('border-left', function(d) {
        var ret = config.size + 'px ';
        ret += 'solid ';
        ret += d.color;
        return ret;
      })
      .style('font-size', config.size + 'px')
      .style('padding-left', '5px')
      .style('margin-right', '15px')
      .style('cursor', 'pointer')
      .on('click', function(d) {
        config.dispatch[config.clickEvent](d.id);
      });

    u.text(function(d) {return d.label;});
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
      construct();
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