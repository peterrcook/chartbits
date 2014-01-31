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
      .freezeOnClick(true)
      .element('circle');

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
      .element('circle');

    d3.select('#charts .chart2')
      .call(toolTip);
  }

  function construct3() {
    var data1 = [];
    var data2 = [];
    var width = 500;
    var height = 300;

    for(var i=0; i<10; i++) {
      data1.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 50,
        data1: Math.random() * 50,
        data2: Math.random() * 50,
        data3: Math.random() * 50,
      });
    }

    d3.select('#charts .chart3 svg')
      .selectAll('circle')
      .data(data1)
      .enter()
      .append('circle')
      .attr('cx', function(d) {return d.x;})
      .attr('cy', function(d) {return d.y;})
      .attr('r', function(d) {return d.r;});


    for(var i=0; i<10; i++) {
      data2.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 50,
        data1: Math.random() * 50,
        data2: Math.random() * 50,
        data3: Math.random() * 50,
      });
    }

    d3.select('#charts .chart3 svg')
      .selectAll('rect')
      .data(data2)
      .enter()
      .append('rect')
      .attr('x', function(d) {return d.x;})
      .attr('y', function(d) {return d.y;})
      .attr('width', function(d) {return d.r;})
      .attr('height', function(d) {return d.r;});

    var toolTip = animdata.d3.toolTip()
      .templates([
        '<h1>Circle</h1><div>x: <%= data.x %></div><div>y: <%= data.y %></div><div>r: <%= data.r %></div>',
        '<h1>Square</h1><div>x: <%= data.x %></div><div>y: <%= data.y %></div><div>r: <%= data.r %></div>'
      ])
      .elements(['circle', 'rect'])
      .freezeOnClick(true)
      .templateVariableScope(true);

    d3.select('#charts .chart3')
      .call(toolTip);

    // var toolTip1 = animdata.d3.toolTip()
    //   .title('This is a circle')
    //   .fields(['data1', 'data2', 'data3'])
    //   .elements('circle')
    //   .freezeOnClick(true);

    // d3.select('#charts .chart3')
    //   .call(toolTip1);

    // var toolTip2 = animdata.d3.toolTip()
    //   .title('This is a square')
    //   .fields(['data1', 'data2'])
    //   .elements('rect')
    //   .freezeOnClick(true);

    // d3.select('#charts .chart3')
    //   .call(toolTip2);

  }


  construct1();
  construct2();
  construct3();
})();