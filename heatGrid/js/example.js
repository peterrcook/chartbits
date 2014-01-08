(function(){
  var data1 = [
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    [[10, 5], [5, 10]]
  ];

  var heatGrid = animdata.d3.heatGrid()
    .width(10)
    .padding(1)
    .range(['white', 'black'])
    .domain([0, 9]);

  var grid = d3.select('#chart')
    .append('svg')
    .append('g')
    .classed('heat-grid', true)
    .datum(data1)
    .call(heatGrid);

  grid
    .selectAll('g.grid')
    .attr('transform', function(d, i) {return animdata.svg.translate(0, i * 20);});
})();