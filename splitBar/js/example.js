(function(){

  function chart1() {
    var data1 = [50, 100, 200, 400];
    var transform = {x: 110, y: 0};
    var bar = animdata.d3.splitBar()
      .barWidth(15)
      // .domain([-10, 10])
      .domains([[-100, 100], [-100, 100], [-100, 100], [-100, 100]])
      .range([-50, 50])
      .orientation('horizontal')
      .transform(transform)
      .showValues(true)
      .valueSide('left')
      .splitThresholds([[-100, 100], [-100, 100], [-100, 100], [-100, 100]])
      .splitFactors([2, 2, 2, 2]);

    var container = d3.select('#chart1')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 70)
      .append('g')
      .attr('transform', animdata.svg.translate(50, 50));

    container
      .selectAll('line')
      .data(data1)
      .enter()
      .append('line')
      .attr('x1', function(d, i) {return i * transform.x;})
      .attr('x2', function(d, i) {return i * transform.x;})
      .attr('y1', -5)
      .attr('y2', 20);

    container
      .classed('bar', true)
      .datum(data1)
      .call(bar);
    }


  chart1();
})();