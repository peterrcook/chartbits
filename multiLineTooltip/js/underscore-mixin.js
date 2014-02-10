_.mixin({
  sum: function(array, accessor) {
    return _.reduce(array, function(m, v) {
      return accessor === undefined ? m + v : m + accessor(v);
    }, 0);
  }
});