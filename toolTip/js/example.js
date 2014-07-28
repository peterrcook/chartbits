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
      .element('circle')
      .width(150);

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

  function construct4() {
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

    d3.select('#charts .chart4 svg')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function(d) {return d.x;})
      .attr('cy', function(d) {return d.y;})
      .attr('r', function(d) {return d.r;});

    var toolTip = animdata.d3.toolTip()
      .title('Circle')
      .templateFunc(function(d) {
        return '<div>data1 = ' + d.data1 + '</div>';
      })
      .element('circle');

    d3.select('#charts .chart4')
      .call(toolTip);
  }

  function construct5() {
    var data = [
      {value: 20}, 
      {value: 40}, 
      {value: 30},
      {value: 20}
    ];

    d3.select('#charts .chart5')
      .selectAll('div.item')
      .data(data)
      .enter()
      .append('div')
      .classed('item', true)
      .text(function(d) {return d.value;});

    var toolTip = animdata.d3.toolTip()
      .title('HTML div element')
      .templateFunc(function(d) {
        return '<div>value = ' + d.value + '</div>';
      })
      .element('div');

    d3.select('#charts .chart5')
      .call(toolTip);
  }

  construct1();
  construct2();
  construct3();
  construct4();
  construct5();
})();