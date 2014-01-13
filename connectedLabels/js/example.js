(function(){
  var data1 = [
    {
      labels: ['Andy', 'Brian', 'Chris'],
      position: {x: 380, y: 100}
    },
    {
      labels: ['Dave', 'Eric'],
      position: {x: 400, y: 130}
    },
    {
      labels: ['Fred', 'Graham', 'Harry'],
      position: {x: 420, y: 160}
    },
    {
      labels: ['Ian', 'Jeff', 'Kevin'],
      position: {x: 440, y: 190}
    }
  ];



  // Helpers



  // Construction
  function construct1() {
    var connectedLabels = animdata.d3.connectedLabels()
      .connectorSide('left')
      .fontSize(10)
      .position({x: 500, y: 50});

    d3.select('#charts .chart1')
      .datum(data1)
      .call(connectedLabels);

    d3.select('#charts .chart1 svg.layer')
      .append('g')
      .selectAll('circle')
      .data(data1)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d) {return d.position.x;})
      .attr('cy', function(d) {return d.position.y;})
    }

  function construct2() {
    var connectedLabels = animdata.d3.connectedLabels()
      .connectorSide('right')
      .fontSize(12)
      .position({x: 200, y: 50});

    d3.select('#charts .chart2')
      .datum(data1)
      .call(connectedLabels);

    d3.select('#charts .chart2 svg.layer')
      .append('g')
      .selectAll('circle')
      .data(data1)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d) {return d.position.x;})
      .attr('cy', function(d) {return d.position.y;})
    }

  function construct3() {
    var connectedLabels = animdata.d3.connectedLabels()
      .connectorSide('left')
      .fontSize(12)
      .position({x: 500, y: 250});

    d3.select('#charts .chart3')
      .datum(data1)
      .call(connectedLabels);

    d3.select('#charts .chart3 svg.layer')
      .append('g')
      .selectAll('circle')
      .data(data1)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d) {return d.position.x;})
      .attr('cy', function(d) {return d.position.y;})
    }

  function construct4() {
    var connectedLabels = animdata.d3.connectedLabels()
      .connectorSide('right')
      .fontSize(12)
      .position({x: 200, y: 250});

    d3.select('#charts .chart4')
      .datum(data1)
      .call(connectedLabels);

    d3.select('#charts .chart4 svg.layer')
      .append('g')
      .selectAll('circle')
      .data(data1)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d) {return d.position.x;})
      .attr('cy', function(d) {return d.position.y;})
    }

  construct1();
  construct2();
  construct3();
  construct4();
})();