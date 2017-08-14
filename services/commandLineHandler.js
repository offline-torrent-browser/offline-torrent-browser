const fs      = require('fs');
const path    = require('path');

exports.fetchParameters = function() {
  if (process.argv.length != 3) {
    var script = path.basename(process.argv[1]);
    console.log("\nUsage: " + script + " <file.sqlite>");
    return {};
  }

  var sqliteFileParameter = process.argv[2];
  if (!fs.existsSync(sqliteFileParameter)) {
    console.log("\nError, file '" + sqliteFileParameter + "' doesn't exist.")
    return {};
  }

  return {sqliteFileParameter: sqliteFileParameter};
}