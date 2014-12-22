
var Q = require('q');

var fs = require('fs');
var http = require('http');
var URL = require('url');
var Form = require('./form');

var Realm = require('./realm');
var AuthenticatedClient = require('keycloak-authenticated-client');

function KeycloakClient(opts) {
  this.client = new AuthenticatedClient( opts );
}

KeycloakClient.prototype.getRealm = function(callback) {
  var opts = URL.parse( this.client.realmAdminUrl );
  opts.type = 'json';

  var self = this;

  return this.client.request( opts )
    .then( function(data) {
      return new Realm( self.client, data );
    })
}

module.exports = KeycloakClient;