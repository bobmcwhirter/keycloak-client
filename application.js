
var util = require('./util');
var Role = require('./role' );

var URL = require('url');

function Application(client, data) {
  this.client = client;
  util.linkData( this, data );
}

Application.prototype.getRoles = function(callback) {

  var opts = URL.parse( this.client.config.realmAdminUrl + '/applications/' + this.name + '/roles' );
  opts.type = 'json';

  var self = this;
  return this.client.request( opts )
    .then( function(roles) {
      return roles.map( function(each) { return new Role( self.client, each ); } );
    })
    .nodeify( callback );
}

Application.prototype.getRole = function(name, callback) {
  var opts = URL.parse( this.client.config.realmAdminUrl + '/applications/' + this.name + '/roles/' + name );
  opts.type = 'json';

  var self = this;
  return this.client.request( opts )
    .then( function(role) {
      return new Role( self.client, role );
    })
    .nodeify(callback);
}

Application.prototype.createRole = function(data, callback ) {

  var opts = URL.parse( this.client.config.realmAdminUrl + '/applications/' + this.name + '/roles');
  opts.method = 'POST';
  opts.type = 'json';

  var self = this;

  return this.client.request( opts, function(request) {
      request.write( JSON.stringify( data ) );
    } )
    .then( function() {
      return self.getRole( data.name );
    })
    .nodeify( callback );
}

module.exports = Application;