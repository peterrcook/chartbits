(function(){

  function chart1() {
    var data1 = [
      [1, 2, 3, 4],
      [10, 60, 40, -40],
      [500, -200, -300, 0]
    ];
    var visible = [true, true, true];

    var line = animdata.d3.multiLine()
      .xStep(50)
      .domains([[1, 4], [-40, 60], [-400, 600]])
      .range([-100, 100])
      .seriesVisible([true, true, true])
      .colors(['steelblue', 'orange', 'green']);

    var container = d3.select('#chart1')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 300)
      .append('g')
      .attr('transform', animdata.svg.translate(50, 200));

    container
      .classed('bar', true)
      .datum(data1)
      .call(line);

    // Menu
    var menu = d3.select('#chart1')
      .append('div')
      .classed('menu', true)
      .selectAll('div.item')
      .data(data1)
      .enter()
      .append('div')
      .classed('item visible', true)
      .text(function(d, i) {return 'Series ' + i;})
      .on('click', function(d, i) {
        var e = d3.select(this);
        e.classed('visible', !e.classed('visible'));
        visible[i] = e.classed('visible');

      line
        .seriesVisible(visible);

      container
        .call(line);
      });

    }


  function chart2() {
    var data1 = {d: [4, 1, -7, 5, -1, 5]};
    var transform = {x: 0, y: 15};
    var bar = animdata.d3.bar()
      .datumAccessor(function(d) {return d.d;})
      .barWidth(10)
      .domain([-10, 10])
      .range([-50, 50])
      .orientation('horizontal')
      .transform(transform)
      .signColors(['red', 'green']);

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
  // chart2();
})();