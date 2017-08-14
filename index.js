#!/usr/bin/env node

const express = require('express')
const app                = express()
app.set('view engine', 'ejs');
app.set('views'      , __dirname + '/views');
app.use('/static'    , express.static(__dirname + '/static'));

const cliHandler         = require('./services/commandLineHandler.js')
const dht                = require('./services/dht.js')
const torrentsDaoFactory = require('./services/torrentsDao.js')
const descriptionFormat  = require('./services/torrentDescriptionFormat.js')

const cliParams           = cliHandler.fetchParameters();
const sqliteFileParameter = cliParams.sqliteFileParameter;

if (!sqliteFileParameter) {
  process.exit();
}

const torrentsDao         = new torrentsDaoFactory(sqliteFileParameter);

app.listen(3000, '127.0.0.1', function () {
  console.log('Server has started, open in your browser http://localhost:3000')

  console.log('Loading the database.....');
  torrentsDao.totalTorrents(function(errors, count) {
    if (errors) {
      console.error("Error loading the database.", errors);
    } else {
      console.log("Total number of loaded torrents: " + count.total);
    }
  });
})

app.get('/', function (req, res) {

  torrentsDao.getValue("index", function(errors, indexValueRow) {
    var indexValueRow = indexValueRow || {};
    var indexValue = indexValueRow.value;

    torrentsDao.totalTorrents(function(errors, row) {
      var row = row || {};
      var total = row.total || 0;
      var renderParams = {
        totalTorrents: total,
        indexValue: indexValue,
        errors: null
      };

      if (errors) {
        renderParams.errors = errors;
      }
      res.render('index', renderParams)
    })
  });

})

app.get('/search', function (req, res) {
  var pageQuery     = (req.query.page ? parseInt(req.query.page) : 0);

  torrentsDao.findByName(req.query.name, pageQuery, function(errors, torrents, moreResults) {
    if (errors) console.log("Errors ", errors)

    var torrents   = torrents || [];
    var totalFound = torrents[0] ? torrents[0].total_rows : 0;

    res.render('search', {torrents     : torrents,
                          prevPageQuery: pageQuery - 1,
                          nextPageQuery: pageQuery + 1,
                          moreResults  : moreResults,
                          nameQuery    : req.query.name,
                          totalFound   : totalFound
                         });
  })
})

app.get('/details', function (req, res) {
  torrentsDao.findById(req.query.id, function(errors, torrent) {
    if (errors) console.log("Errors ", errors)

    var torrent         = torrent || {};
    var description     = torrent.description || "";
    torrent.description = descriptionFormat.format(description);

    res.render('details', {torrent: torrent});
  })
});

app.get('/dht-peers', function (req, res) {
  dht.lookup(req.query.hash, function(error, peers) {
    res.setHeader('Content-Type', 'application/json');
    if (error) {
      console.info('Error while retrivieng peer number: ', error)
      res.send(JSON.stringify({ peers: 'error' }));
    } else {
      res.send(JSON.stringify({ peers: peers }));
    }
  })
})