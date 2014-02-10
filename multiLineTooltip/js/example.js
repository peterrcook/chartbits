(function(){

  function chart1() {
    var data1 = [
      [4, 1, -2, -3],
      [10, 60, 40, -40],
      [500, -200, -300, 0]
    ];
    var visible = [true, true, true];

    var line = animdata.d3.multiLine()
      .xStep(100)
      .domains([[-10, 10], [-100, 100], [-1000, 1000]])
      .range([0, 400])
      .seriesVisible([true, true, true])
      .colors(['steelblue', 'orange', 'green']);

    var container = d3.select('.chart1')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 300)
      .append('g')
      .attr('transform', animdata.svg.translate(50, 0));

    container
      .classed('bar', true)
      .datum(data1)
      .call(line);

    // Tooltip
    var toolTip = animdata.d3.multiLineTooltip()
      .svgOffset({x: 50, y: 0})
      .offset({x: 5, y: 50})
      .xStep(100)
      .domains([[-10, 10], [-100, 100], [-1000, 1000]])
      .range([0, 400])
      .width(150)
      .colors(['steelblue', 'orange', 'green'])
      .seriesNames(['Series A', 'Series B', 'Series C'])
      .units(['%', ' US$', '%']);

    d3.select('.chart1')
      .datum(data1)
      .call(toolTip);


    // Menu
    var menu = d3.select('.chart1')
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

      toolTip
        .seriesVisible(visible);
      d3.select('.chart1')
        .datum(data1)
        .call(toolTip);
      });

  }

  chart1();

})();