(function(){
  var data1 = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 270];

  // Helpers



  // Construction
  function construct1() {
    var radialPoints = animdata.d3.radialPoints()
      .majorRadius(100)
      .pointRadius(5)
      .fadeRate(0.10);

    var grid = d3.select('#charts .chart1 g')
      .attr('transform', 'translate(150, 150)')
      .datum(data1)
      .call(radialPoints);
    }

  construct1();
})();