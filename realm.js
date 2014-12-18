
var Q = require('q');

var http = require('http');
var URL  = require('url');

var Application = require('./application');
var Role        = require('./role');
var User        = require('./user');

var util = require('./util' );
var Form = require('./form');


function Realm(client, data) {
  this.client = client;
  util.linkData( this, data );
}

Realm.prototype.getApplications = function(callback) {
  var opts = URL.parse( this.client.realmAdminUrl + '/applications');
  opts.type = 'json';

  var self = this;
  return this.client.request( opts )
    .then( function(apps) {
      return apps.map( function(each) { return new Application( self.client, each ); } );
    })
    .nodeify(callback);
}

Realm.prototype.getApplication = function(name, callback) {
  var opts = URL.parse( this.client.realmAdminUrl + '/applications/' + name);
  opts.type = 'json';

  var self = this;
  return this.client.request( opts )
    .then( function(app) {
      return new Application( self.client, app );
    })
    .nodeify(callback);
}

Realm.prototype.getRoles = function(callback) {
  var opts = URL.parse( this.client.realmAdminUrl + '/roles' );
  opts.type = 'json';

  var self = this;
  return this.client.request( opts )
    .then( function(roles) {
      return roles.map( function(each) { return new Role( self.client, each ); } );
    })
    .nodeify(callback);
}

Realm.prototype.getRole = function(name, callback) {
  var opts = URL.parse( this.client.realmAdminUrl + '/roles/' + name );
  opts.type = 'json';

  var self = this;
  return this.client.request( opts )
    .then( function(role) {
      return new Role( self.client, role );
    })
    .nodeify(callback);
}

Realm.prototype.createRole = function(data, callback ) {

  var opts = URL.parse( this.client.realmAdminUrl + '/roles');
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

Realm.prototype.getUsers = function(callback) {
  var opts = URL.parse( this.client.realmAdminUrl + '/users/')
  opts.type = 'json';

  var self = this;
  return this.client.request( opts )
    .then( function(users) {
      return users.map( function(each) { return new User( self.client, each ); } );
    })
    .nodeify(callback);
}


module.exports = Realm;