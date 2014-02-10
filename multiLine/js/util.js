/* (C) 2013 Peter Cook MIT License */
(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.util = animdata.util || {};

animdata.util.initArray = function(value, numValues) {
  var a = [];
  for(var i=0; i<numValues; i++)
    a.push(value);
  return a;
}

animdata.util.initMatrix = function(m, rows, cols, v) {
  for(var i=0; i<rows; i++) {
    m[i] = [];
    for(var j=0; j<cols; j++) {
      m[i][j] = v;
    }
  }
  // return m;
}

animdata.util.radToPercent = function(r) {
  return (r / (2 * Math.PI)) * 100 + '%';
}

animdata.util.cleanCSV = function(csv) {
  var ret = _.map(csv, function(row) {
    var newRow = {};
    _.each(row, function(d, k) {
      var newd = d;

      // Remove %s
      if(_.isString(d) && d.indexOf('%') > -1)
        newd = +d.replace('%', '');

      newRow[k] = newd;
    });
    return newRow;
  });
  return ret;
}

})();