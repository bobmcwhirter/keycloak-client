var util = require('./util');

function User(client, data) {
  this.client = client;

  util.linkData( this, data );
}

module.exports = User;