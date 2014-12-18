
var KeycloakClient = require('./../keycloak-client');

describe( "keycloak client", function() {

  var client;

  beforeEach( function() {
    client = new KeycloakClient( { username: 'lucy', password: 'lucy' });
  })

  it( 'should be able to obtain the realm', function(done) {
    client.getRealm()
      .then( function(realm) {
        console.log( "REALM", realm );
      })
      .done( done );
  })

  it( 'should be able to fetch roles from the realm', function(done) {
    client.getRealm()
      .invoke( 'getRoles' )
      .then( function(roles) {
        console.log( 'roles', roles );
      })
      .done(done);
  })

  it ( 'should be able to create a realm role', function(done) {
    client.getRealm()
      .invoke( 'createRole', { name: 'new role' } )
      .then( function(role) {
        console.log( "created", role );
      })
      .done( done );

  })

  it( 'should be able to fetch applications from realm', function(done) {
    client.getRealm()
      .invoke( 'getApplications' )
      .then( function(apps) {
        console.log( "APPS", apps );
      })
      .done(done);
  })

  it( 'should be able to fetch a single application from realm', function(done) {
    client.getRealm()
      .invoke( 'getApplication', 'example-app' )
      .then( function(app) {
        console.log( "APP", app );
      })
      .done(done);
  })

  it( 'should be able to fetch roles from an app', function(done) {
    client.getRealm()
      .invoke( 'getApplication', 'example-app' )
      .invoke( 'getRoles' )
      .then( function(roles) {
        console.log( 'roles', roles );
      })
      .done(done);
  })

  it( 'should be able to fetch users from a realm', function(done) {
    client.getRealm()
      .invoke( 'getUsers' )
      .then( function(users) {
        console.log( "users", users );
      })
      .done(done);
  })


})