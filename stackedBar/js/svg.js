(function() {

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.svg = {};

animdata.svg = animdata.svg || {};
animdata.svg.translate = function(x, y) {
  return 'translate('+(+x)+','+(+y)+')';
}

})();