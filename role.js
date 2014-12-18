var util = require('./util');

function Role(client, data) {
  this.client = client;

  util.linkData( this, data );
}

module.exports = Role;