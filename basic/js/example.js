(function(){
  var data1 = [
  ];

  // Helpers
 


  // Construction
  function construct1() {
    var chord = animdata.d3.chord();

    var grid = d3.select('#charts .chart1')
      .style('width', '600px')
      .style('height', '200px')
      .datum(data1)
      .call(treeMap);
    }

  construct1();
})();