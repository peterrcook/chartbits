/* (C) 2014 Peter Cook */

(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.chord = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
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