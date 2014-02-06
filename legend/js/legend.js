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
    clickEvent: '',
    changeEvent: '',
    status: null
  }




  /*----
  Internal variables
  ----*/
  var constructed = false;
  var data = null;

  var d3elements = {
    container: null,
  }

  var status = [];

  /*--
  Init
  --*/
  function init() {
    if(!config.status) {
      config.status = _.map(data, function(d) {
        return true;
      });
    }
    status = config.status;
    // console.log(config.status);
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
      .classed('selected', function(d, i) {
        return status[i];
      })
      .style('float', 'left')
      .style('border-left', function(d, i) {
        var ret = config.size + 'px ';
        ret += 'solid ';
        return ret;
      })
      .style('font-size', config.size + 'px')
      .style('padding-left', '5px')
      .style('margin-right', '15px')
      .style('cursor', 'pointer')
      .on('click', function(d, i) {
        var e = d3.select(this);
        var selected = e.classed('selected');
        e.classed('selected', !selected);
        status[i] = !selected;
        updateColors();
        if(config.clickEvent)
          config.dispatch[config.clickEvent](d.id);
        if(config.changeEvent)
        config.dispatch[config.changeEvent](status);
      })
      .each(noSelectCSS);

    u.text(function(d) {return d.label;});

    updateColors();
  }

  function noSelectCSS() {
    d3.select(this)
      .style({
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none'
      });
  }

  function updateColors() {
    d3elements.container
      .selectAll('div.item')
      .style('border-left-color', function(d, i) {
        var color = status[i] ? d.color : '#ddd';
        return color;
      });
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
      init();
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