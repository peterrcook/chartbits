(function(){
  var data1 = [
    {
      labels: ['Andy', 'Brian', 'Cheryl'],
      position: {x: 380, y: 100},
      classes: ['andy male', 'brian male', 'cheryl female']
    },
    {
      labels: ['Dave', 'Elizabeth'],
      position: {x: 400, y: 130},
      classes: ['dave male', 'elizabeth female']
    },
    {
      labels: ['Fred', 'Graham', 'Harry'],
      position: {x: 420, y: 160},
      classes: ['fred', 'graham', 'harry']
    },
    {
      labels: ['Ian', 'Jeff', 'Kevin'],
      position: {x: 440, y: 190},
      classes: ['ian', 'jeff', 'kevin']
    }
  ];



  // Helpers



  // Construction
  function construct1() {
    var connectedLabels = animdata.d3.connectedLabels()
      .connectorSide('left')
      .fontSize(12)
      .position({x: 500, y: 50});

    d3.select('#charts .chart1')
      .datum(data1)
      .call(connectedLabels);

    d3.select('#charts .chart1 svg.layer')
      .append('g')
      .classed('points', true)
      .selectAll('circle')
      .data(data1)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', function(d) {return d.position.x;})
      .attr('cy', function(d) {return d.position.y;})
      .attr('class', function(d) {
        if(d.classes) {
          var classes = _.uniq(d.classes.join(' ').split(' ')).join(' ');
          return classes;
        }
        return '';
      });

    // Set up some basic hovering
    d3.selectAll('#charts .chart1 .labels .label')
      .on('mouseover', function(d) {
        d3.select(this)
          .classed('hover', true);

        var label = d;
        // console.log('#charts .chart1 svg .label-group.'+d.toLowerCase());
        d3.select('#charts .chart1 svg .label-group.'+d.toLowerCase())
          .classed('hover', true);

        d3.select('#charts .chart1 svg g.points circle.'+d.toLowerCase())
         .classed('hover', true);
      })
      .on('mouseout', function(d) {
        d3.selectAll('#charts .chart1 .labels .label-group span')
          .classed('hover', false);
        d3.selectAll('#charts .chart1 svg .label-group')
          .classed('hover', false);        
        d3.selectAll('#charts .chart1 svg g.points circle')
         .classed('hover', false);
      });

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