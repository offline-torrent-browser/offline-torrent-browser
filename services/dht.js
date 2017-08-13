var DHT   = require('bittorrent-dht');
var dht   = new DHT();
var debug = false;

dht.listen(0, function () {
  if (debug) console.log('DHT is now started');
});

var foundCache = [];

dht.on('peer', function (peer, infoHash, from) {
  if (debug) console.log('found potential peer ' + peer.host + ':' + peer.port + ' through ' + from.address + ':' + from.port)
  var infoHash                  = infoHash.toString('hex').toLowerCase();
  foundCache[infoHash]          = foundCache[infoHash] ? foundCache[infoHash] : {};
  foundCache[infoHash]['found'] = foundCache[infoHash]['found'] ? foundCache[infoHash]['found'] : 0;

  if (!foundCache[infoHash][peer.host]) {
    foundCache[infoHash][peer.host] = 1;
    foundCache[infoHash]['found']++;
  }
})

function getPeerCount(hash) {
  var hash = hash.toLowerCase();
  if (foundCache[hash] && foundCache[hash]['found']) {
    return foundCache[hash]['found'];
  } else {
    return 0;
  }
}

exports.lookup = function(hash, callback) {
  if (getPeerCount(hash) > 0) {
    callback(null, getPeerCount(hash))
  } else {
    dht.lookup(hash, function(error, nodes) {
      callback(error, getPeerCount(hash));
    });
  }

};