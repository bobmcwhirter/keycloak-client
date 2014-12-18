
var AuthenticatedClient = require('./../authenticated-client');

describe( "authenticated client", function() {

  var client;

  beforeEach( function() {
    client = new AuthenticatedClient( { username: 'lucy', password: 'lucy' });
  })

  xit( 'should allow obtaining a grant with a callback', function(done) {
    client.obtainGrantDirectly( function() {
      done();
    })
  })

  xit( 'should allow obtainig a grant with a promise', function(done) {
    client.obtainGrantDirectly()
      .done( done );
  })

  it( 'should be able to perform authenticated requests', function(done) {
    client.request( 'http://localhost:8080/auth/admin/realms/example-realm/applications' )
      .then( function( response ) {
        console.log( "response", response.statusCode );
        response.on( 'data', function(d) {
          console.log( d.toString() );
        })
        response.on( 'end', function() {
          done();
        })
      })
  })


})