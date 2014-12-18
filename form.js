
function Form(params) {
  this._params = {};
  if ( params ) {
    for ( k in params ) {
      this._params[k] = params[k];
    }
  }
}

Form.prototype.set = function(name, value) {
  this._params[name] = value;
}

Form.prototype.encode = function() {
  var s = '';
  var first = true;

  for ( k in this._params ) {
    if ( ! first ) {
      s += '&';
    }
    first = false;
    s = s + k + '=' + encodeURIComponent( this._params[k] );
  }

  return s;
}

module.exports = Form;