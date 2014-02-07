(function(){

  function chart1() {
    var data1 = [
      [4, 1, -2, -3],
      [1, 6, 4, -4],
      [5, -2, -3, 0]
    ];
    var visible = [true, true, true];

    var stackedBar = animdata.d3.stackedBar()
      .barWidth(50)
      .domain([-10, 10])
      .range([-100, 100])
      .colors(['steelblue', 'orange', 'green'])
      .transform({x: 55, y: 0});

    var container = d3.select('#chart1')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 300)
      .append('g')
      .attr('transform', animdata.svg.translate(50, 200));

    container
      .classed('bar', true)
      .datum(data1)
      .call(stackedBar);

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

      stackedBar
        .seriesVisible(visible);

      container
        .call(stackedBar);
      });

    }


  function chart2() {
    var data1 = [
      [{region: 'Europe', value: 4}, {region: 'Europe', value: 1}],
      [{region: 'Asia', value: 1}, {region: 'Asia', value: 6}],
      [{region: 'America', value: 5}, {region: 'America', value: 2}]
    ];
    var visible = [true, true, true];

    var stackedBar = animdata.d3.stackedBar()
      .accessor(function(d) {return d.value;})
      .barWidth(50)
      .domain([-10, 10])
      .range([-100, 100])
      .colors(['steelblue', 'orange', 'green'])
      .transform({x: 55, y: 0});

    var container = d3.select('#chart2')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 300)
      .append('g')
      .attr('transform', animdata.svg.translate(50, 200));

    container
      .classed('bar', true)
      .datum(data1)
      .call(stackedBar);

    container
      .selectAll('rect')
      .on('mouseenter', function(d) {
        d3.select('#chart2 .info').text(d.region);
      });
  }

  chart1();
  chart2();
})();