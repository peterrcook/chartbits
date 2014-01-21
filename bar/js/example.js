(function(){

  function chart1() {
    var data1 = [4, 1, -7, 5000, -1000, 5000];
    var transform = {x: 110, y: 0};
    var bar = animdata.d3.bar()
      .barWidth(10)
      // .domain([-10, 10])
      .domains([[-10, 10], [-10, 10], [-10, 10], [-5000, 5000], [-5000, 5000], [-5000, 5000]])
      .range([-50, 50])
      .orientation('horizontal')
      .transform(transform);

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
      .attr('y2', 15);

    container
      .classed('bar', true)
      .datum(data1)
      .call(bar);
    }


  function chart2() {
    var data1 = [4, 1, -7, 5, -1, 'na', 5];
    var transform = {x: 0, y: 15};
    var bar = animdata.d3.bar()
      .barWidth(10)
      .domain([-10, 10])
      .range([-50, 50])
      .orientation('horizontal')
      .transform(transform);

    var container = d3.select('#chart2')
      .append('svg')
      .append('g')
      .attr('transform', animdata.svg.translate(50, 50));

    container
      .append('line')
      .attr('y1', -5)
      .attr('y2', 90);

    container
      .classed('bar', true)
      .datum(data1)
      .call(bar);
    }

  chart1();
  chart2();
})();