(function(){
  var data1 = [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ];

  // Helpers
 


  // Construction
  function construct1() {
    var radius = 200;
    var chord = animdata.d3.chord()
      .innerRadius(radius)
      .outerRadius(radius + 15)
      .nodeColors(['steelblue', 'indianred']);

    var grid = d3.select('#charts .chart1 svg')
      .append('g')
      .attr('transform', animdata.svg.translate(radius * 1.4, radius * 1.4))
      .datum(data1)
      .call(chord);
    }

  construct1();
})();