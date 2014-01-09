(function(){

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
      .elements('circle');

    d3.select('#charts .chart1')
      .call(toolTip);
  }


  // Construction
  function construct2() {
    var data = [];
    var width = 500;
    var height = 300;

    for(var i=0; i<10; i++) {
      data.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 50,
        data1: Math.random() * 50,
        data2: Math.random() * 50,
        data3: Math.random() * 50,
      });
    }

    d3.select('#charts .chart2 svg')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function(d) {return d.x;})
      .attr('cy', function(d) {return d.y;})
      .attr('r', function(d) {return d.r;});

    var toolTip = animdata.d3.toolTip()
      .title('Circle')
      .fields(['data1', 'data2', 'data3'])
      .elements('circle');

    d3.select('#charts .chart2')
      .call(toolTip);
  }


  construct1();
  construct2();
})();