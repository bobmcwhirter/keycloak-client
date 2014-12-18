
function linkData(object, data) {

  object._data = data;

  for ( k in data ) {
    (function() {
      var name = k;
      Object.defineProperty( object, name, {
        get: function() {
          return object._data[name];
        },
        set: function(v) {
          object._data[name] = v;
        }
      })
    })();
  }
}

module.exports = { linkData: linkData };