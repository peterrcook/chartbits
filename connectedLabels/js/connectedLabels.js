(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.connectedLabels = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    // connectorSide: 'left',  // the side of the labels the connector emanates from
    fontSize: 12,
    position: {x: 0, y: 0},  // the position of the labels relative to the container
    // labelWidth: 200,
    connectorContainer: null, // svg group for the connectors
    classed: null  // class assigned to all connectors and label-groups
  }




  /*----
  Internal variables
  ----*/
  var constructed = false;
  var d3elements = {
    container: null,
    groups: null,
    svg: null,
    divLayer: null,
    labelContainer: null,
  }


  /*-----
  Helpers
  -----*/
  // function labelList(d) {
  //   var i = -1;
  //   l = _.map(d.labels, function(v) {
  //     i++;
  //     var ret = '';
  //     if(d.classes)
  //       ret = '<span class="label '+ d.classes[i] +'">' + v + '</span>';
  //     else
  //       ret = '<span class="label">' + v + '</span>';
  //     return ret;
  //   });
  //   l = l.join(', ');
  //   return l;
  // }

  function labelList(d) {
    // Use nested spans to allow for comma... is there a nicer way to do this?
    var wrapper = d3.select(this)
      .selectAll('span.label')
      .data(function(d) {return d.labels;})
      .enter()
      .append('span');

    wrapper
      .append('span')
      .attr('class', function(dd, i) {
        if(d.classes)
          return d.classes[i];
        return '';
      })
      .classed('label', true)
      .text(function(d) {return d;});

    wrapper
      .append('span')
      .text(', ');
  }  



  /*--
  Init
  --*/
  function init(selection) {
    // To make things simpler, we assume just one element in the selection
    d3elements.container = d3.select(selection[0][0]);
    // d3elements.divLayer = d3elements.container.select('div.layer');
    d3elements.svg = d3elements.container.select(config.connectorContainer);

    data = d3elements.container.datum();
  }

  /*----
  Chart building
  ----*/
  // function constructChart() {
  // }



  /*----
  Update
  ----*/
  function connectorPath(d, i) {
    // var labelY = config.position.y + (i + 0.5) * (config.fontSize + 4);
    p = animdata.svg.pathAbsMove(d.labelPosition.x, d.labelPosition.y);
    p += animdata.svg.pathAbsLine(d.position.x, d.labelPosition.y);
    p += animdata.svg.pathAbsLine(d.position.x, d.position.y);
    return p;
  }

  function update() {
    var containerWidth = +d3elements.container
      .style('width')
      .replace('px', '');

    var labelGroups = d3elements.container
      .selectAll('div.label-group')
      .data(data)
      .enter()
      .append('div')
      .style('position', 'absolute')
      // .style('right', config.connectorSide === 'right' ? 0 : null)
      .style('left', function(d) {return d.connectorSide === 'left' ? d.labelPosition.x + 'px' : null;})
      .style('right', function(d) {return d.connectorSide === 'right' ? containerWidth - d.labelPosition.x + 'px' : null;})
      .style('top', function(d) {return d.labelPosition.y - 0.5 * config.fontSize + 'px';})
      .style('font-size', config.fontSize + 'px')
      .attr('class', function(d, i) {return 'label-group group-'+i;})
      .classed(config.classed, true);

    labelGroups
      .each(labelList);

    // Remove the comma - a bit hacky :(
    labelGroups
      .selectAll('span:last-child span:last-child')
      .remove();

      // .html(function(d) {return labelList(d);});

    // Attach label data to span elements - a bit unorthodox, but allows us to comma-separate
    // labelGroups
    //   .selectAll('span')
    //   .data(function(d) {return d.labels;});

    d3elements.svg
      .selectAll('path.connector')
      .data(function(d) {return d;})
      .enter()
      .append('path')
      .attr('class', function(d, i) {
        var classes = [];
        classes.push('label-group');
        classes.push('group-'+i);

        if(d.classes)
          classes = _.union(classes, d.classes);

        return classes.join(' ');
      })
      .classed('connector', true)
      .classed(config.classed, true)
      .style('fill', 'none')
      .attr('d', connectorPath);
  }



  /*----
  Main chart function
  ----*/
  function chart(selection) {
    // console.log('selection', selection);

    init(selection);
    // console.log(data);

    // Construct the chart if this is first call
    // if(!constructed) {
    //   constructChart();
    // }

    update();

    constructed = true;
  }



  /*----
  Configuration getters/setters
  -----*/
  d3.keys(config).forEach(function(a) {
    chart[a] = function(_) {
      if(!arguments.length) return config[a];
      config[a] = _;
      return chart;
    }
  });

  return chart;
}

})();