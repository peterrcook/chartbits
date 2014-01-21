(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.chord = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    innerRadius: 100,
    outerRadius: 110,
    defaultChordColor: '#ddd',
    nodeColors: ['steelblue'],
    chordBorderColor: '#aaa',
    chordHoverColor: '#aaa',
    padding: 0.02
  }




  /*----
  Internal variables
  ----*/
  var constructed = false;
  var data = null;
  var chordLayout = null; // chord layout

  var d3elements = {
    svg: null,
  }


  /*--
  Init
  --*/
  function init() {
    chordLayout = d3.layout.chord()
        .padding(config.padding);

    // Courteousy of http://stackoverflow.com/questions/14167863/how-can-i-bring-a-circle-to-the-front-with-d3
    d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };
  }



  /*----
  Chart building
  ----*/
  function construct() {
  }



  /*----
  Update
  ----*/
  function update() {
    chordLayout.matrix(data);

    console.log(chordLayout.groups());


    d3elements.svg
      .append('g')
      .selectAll('path')
      .data(chordLayout.groups) //TODO 
      .enter()
      .append('path')
      .style('fill', fill)
      // .style('stroke', function(d) { return fill(d.index); })
      .attr('d', d3.svg.arc().innerRadius(config.innerRadius).outerRadius(config.outerRadius))
      .on('mouseover', hoverNode)
      .on('mouseout', resetChords);

    d3elements.svg
      .append('g')
      .classed('chords', true)
      .selectAll('path')
      .data(chordLayout.chords)
      .enter().append('path')
      .attr('d', d3.svg.chord().radius(config.innerRadius))
      .style('fill', config.defaultChordColor)
      .style('stroke', config.chordBorderColor)
      .on('mouseover', hoverChord)
      .on('mouseout', resetChords);
      // .style('fill', function(d, i) {
      //   var c = config.nodeColors; 
      //   return c[i % c.length];
      // });
      // .style('opacity', 1)

  }



  /*-----
  Actions
  -----*/
  function fillColor(i) {
    var c = config.nodeColors; 
    return c[i % c.length];    
  }

  function fill(d, i) {
    return fillColor(i);
  }

  function hoverNode(d, i) {
    // console.log(i);
    d3elements.svg
      .selectAll('.chords path')
      .filter(function(d) {return d.source.index === i || d.target.index === i;})
      .moveToFront()
      .transition()
      .style('fill', fillColor(i));
  }

  function resetChords() {
    d3elements.svg
      .selectAll('.chords path')
      .transition()
      .style('fill', config.defaultChordColor);    
  }

  function hoverChord(d, i) {
    d3.select(this)
      .moveToFront();

    d3.select(this)
      .transition()
      .style('fill', config.chordHoverColor);    
  }



  /*----
  Main chart function
  ----*/
  function chart(selection) {
    // console.log('selection', selection);

    // To make things simpler, we assume just one element in the selection
    d3elements.svg = d3.select(selection[0][0]);
    data = d3elements.svg.datum();

    // console.log(data);

    // Construct the chart if this is first call
    if(!constructed) {
      init();
      construct();
    }

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