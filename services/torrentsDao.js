var sqlite3 = require('sqlite3').verbose();

var torrentColumns = 'torrents.id, torrents.hash, torrents.name, torrents.filename, \
                     torrents.category, torrents.size, torrents.added, torrents.comments, \
                     torrents.views, torrents.thanks';

var resultsPerPage = 100;

function TorrentDao(sqliteFilePath) {
  this.db = new sqlite3.Database(sqliteFilePath);
};

module.exports = TorrentDao;

TorrentDao.prototype.findByName = function(name, page, callbackRows) {
  var skippedResults = page * resultsPerPage;
  return this.db.all('SELECT ' + torrentColumns + ', total.total_rows\
                    FROM torrents, (SELECT count(*) total_rows FROM torrents WHERE name LIKE ?) total  \
                    WHERE name LIKE ?\
                    ORDER BY added DESC \
                    LIMIT ' + skippedResults + ', ' + resultsPerPage,
                    ['%' + name  + '%', '%' + name  + '%'],
                    addCategoryNameCallback(callbackRows, skippedResults)
                   );
}

TorrentDao.prototype.findById = function(id, callbackRow) {
  return this.db.get('SELECT ' + torrentColumns + ', torrents_description.description \
                    FROM torrents \
                    LEFT JOIN torrents_description ON torrents_description.id = torrents.id \
                    WHERE torrents.id = ?', [id], callbackRow);
}

TorrentDao.prototype.totalTorrents = function(callbackResult) {
  return this.db.get('SELECT count(id) as total FROM torrents', callbackResult);
}

TorrentDao.prototype.getValue = function(key, callbackResult) {
  return this.db.get('SELECT value FROM key_value WHERE key = ?', [key], callbackResult);
}

function addCategoryNameCallback(finalCallback, skippedResults) {
  return function(errors, torrents) {
    var torrents = torrents || [];
    torrents = torrents.map(function(row) {
      row['categoryName'] = categoryIdToName(row['category']);
      return row;
    });
    var totalFound  = torrents[0] ? torrents[0].total_rows : 0;
    var moreResults = (totalFound - skippedResults) > resultsPerPage
    finalCallback(errors, torrents, moreResults);
  }
}

var catToNameMap = {
 1: "Movies",
 2: "Music",
 3: "Appz",
 4: "Games",
 5: "TV",
 7: "Other",
 8: "Books",
 9: "Music Video",
10: "Anime",
11: "Animation",
12: "DVD",
13: "Movies Documentary",
14: "Books Audio",
15: "Video Lessons",
16: "Photos",
17: "Sport",
18: "HDTV"};

function categoryIdToName(id) {
  return catToNameMap[id];
}
