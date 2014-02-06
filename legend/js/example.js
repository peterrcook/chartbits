(function(){
  var legendData = [
    {
      id: 'europe',
      label: 'Europe',
      color: 'blue'
    },
    {
      id: 'asia',
      label: 'Asia',
      color: 'red'
    }
  ];

  var dispatch = d3.dispatch('legendClick');

   // Construction
  function construct1() {
    var legend = animdata.d3.legend()
      .size(12)
      .dispatch(dispatch)
      .clickEvent('legendClick');

    d3.select('#charts .chart1 .legend')
      .datum(legendData)
      .call(legend);

    dispatch.on('legendClick', function(id) {
      d3.select('#charts .chart1 .info')
        .text("You've selected " + id);
    });
  }

  construct1();
})();