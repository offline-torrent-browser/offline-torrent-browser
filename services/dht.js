var DHT = require('bittorrent-dht')
var dht = new DHT()

dht.listen(0, function () {})

var foundCache = [];

dht.on('peer', function (peer, infoHash, from) {
  var infoHash                  = infoHash.toString('hex');
  foundCache[infoHash]          = foundCache[infoHash] ? foundCache[infoHash] : {};
  foundCache[infoHash]['found'] = foundCache[infoHash]['found'] ? foundCache[infoHash]['found'] : 0;

  if (!foundCache[infoHash][peer.host]) {
    foundCache[infoHash][peer.host] = 1;
    foundCache[infoHash]['found']++;
  }
})

function getPeerCount(hash) {
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