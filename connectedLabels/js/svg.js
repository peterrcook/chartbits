(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.svg = {};

animdata.svg = animdata.svg || {};
animdata.svg.translate = function(x, y) {
  return 'translate('+(+x)+','+(+y)+')';
}

animdata.svg.pathAbsMove = function(x, y) {
  return 'M' + x + ',' + y;
}

animdata.svg.pathAbsLine = function(x, y) {
  return 'L' + x + ',' + y;
}
})();