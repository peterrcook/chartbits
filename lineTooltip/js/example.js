(function(){

  function chart1() {
    var data1 = [
      [4, 1, -2, -3],
      [1, 6, 4, -4],
      [5, -2, -3, 0]
    ];
    var visible = [true, true, true];

    var line = animdata.d3.line()
      .xStep(150)
      .domain([-10, 10])
      .range([0, 400])
      .seriesVisible([true, true, true])
      .colors(['steelblue', 'orange', 'green']);

    var container = d3.select('.chart1')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 300)
      .append('g');
      // .attr('transform', animdata.svg.translate(50, 200));

    container
      .classed('bar', true)
      .datum(data1)
      .call(line);


    var toolTip = animdata.d3.lineTooltip()
      .xStep(150)
      .domain([-10, 10])
      .range([0, 400])
      .width(150)
      .colors(['steelblue', 'orange', 'green'])
      .seriesNames(['Series A', 'Series B', 'Series C']);

    d3.select('.chart1')
      .datum(data1)
      .call(toolTip);

  }

  chart1();

  // Construction
  function construct1() {
    var data = [];
    var width = 500;
    var height = 300;

    for(var i=0; i<10; i++) {
      data.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 50
      });
    }

    d3.select('#charts .chart1 svg')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function(d) {return d.x;})
      .attr('cy', function(d) {return d.y;})
      .attr('r', function(d) {return d.r;});

    var toolTip = animdata.d3.toolTip()
      .template('<h1>Circle</h1><div>x: <%= x %></div><div>y: <%= y %></div><div>r: <%= r %></div>')
      .freezeOnClick(true)
      .element('circle')
      .width(150);

    d3.select('#charts .chart1')
      .call(toolTip);
  }


})();