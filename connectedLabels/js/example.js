(function(){
  var data1 = [
    {
      labels: ['Andy', 'Brian', 'Cheryl'],
      labelPosition: {x: 500, y: 50},
      connectorSide: 'left',
      position: {x: 380, y: 100},
      classes: ['andy male', 'brian male', 'cheryl female']
    },
    {
      labels: ['Dave', 'Elizabeth'],
      labelPosition: {x: 300, y: 150},
      connectorSide: 'right',
      position: {x: 400, y: 130},
      classes: ['dave male', 'elizabeth female']
    },
    {
      labels: ['Fred', 'Graham', 'Harry'],
      labelPosition: {x: 500, y: 170},
      connectorSide: 'left',
      position: {x: 420, y: 160},
      classes: ['fred', 'graham', 'harry']
    },
    {
      labels: ['Ian', 'Jeff', 'Kevin'],
      labelPosition: {x: 300, y: 180},
      connectorSide: 'right',
      position: {x: 440, y: 190},
      classes: ['ian', 'jeff', 'kevin']
    }
  ];



  // Helpers



  // Construction
  function construct1() {
    d3.select('#charts .chart1 svg')
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

    var connectedLabels = animdata.d3.connectedLabels()
      .classed('all')
      .connectorContainer('g.connectors')
      .fontSize(12);

    d3.select('#charts .chart1')
      .datum(data1)
      .call(connectedLabels);

    // Set up some basic hovering
    d3.selectAll('#charts .chart1 .label')
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
        d3.selectAll('#charts .chart1 .label-group span')
          .classed('hover', false);
        d3.selectAll('#charts .chart1 svg .label-group')
          .classed('hover', false);        
        d3.selectAll('#charts .chart1 svg g.points circle')
         .classed('hover', false);
      });

  }

  construct1();
})();