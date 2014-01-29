(function(){
  // Construction
  function construct1() {
    var axis = animdata.d3.quartersAxis();

    var grid = d3.select('#charts .chart1')
      .append('svg')
      .style('width', '600px')
      .style('height', '200px')
      .append('g')
      .attr('transform', animdata.svg.translate(50, 50))
      .call(axis);
    }

  construct1();
})();