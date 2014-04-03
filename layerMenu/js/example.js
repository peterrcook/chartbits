(function(){

  // Construction
  function construct1() {
    var menu = [
      {label: 'Layer 1', layerSelector: '#charts .chart1'},
      {label: 'Layer 2', layerSelector: '#charts .chart2'},
      {label: 'Layer 3 with a long name', layerSelector: '#charts .chart3'}
    ];

    var layerMenu = animdata.d3.layerMenu()
      .items(menu);

    d3.select('#menu')
      .call(layerMenu);

  }

  construct1();
})();