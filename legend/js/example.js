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

  var dispatch = d3.dispatch('legendClick', 'legendChange');

   // Construction
  function construct1() {
    var legend = animdata.d3.legend()
      .size(12)
      .dispatch(dispatch)
      .status([true, false])
      .clickEvent('legendClick')
      .changeEvent('legendChange');

    d3.select('#charts .chart1 .legend')
      .datum(legendData)
      .call(legend);

    dispatch.on('legendClick', function(id) {
      alert('click', id);
    });
    dispatch.on('legendChange', function(status) {
      d3.select('#charts .chart1 .info')
        .text("Status now " + status.join(' '));
    });
  }

  construct1();
})();