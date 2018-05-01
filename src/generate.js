var fs       = require('fs');
var readline = require('readline');

function readerFor(filename) {
  return readline.createInterface({
    input : fs.createReadStream(filename)
  });
}

function headerFor(filename) {
  return new Promise(
    function(resolve, reject) {
      var lineCount = 0;
      var header    = [];

      readerFor("public/" + filename).on('line', function (line) {
        ++lineCount;
        if (lineCount < 4) {
          header.push(line);
        } else if (lineCount === 4) {
          resolve({
            filename : "/" + filename,
            path     : header[0],
            title    : header[1],
            imgalt   : header[2]
          });
        }
      });
    }
  );
}

function writeToIndex(headers) {
  headers = headers.sort(function(a, b) {
    return a.path < b.path;
  });

  var index  = "var list = [];\n";

  headers.forEach(function(header) {
    index += "list['" + header.path + "'] = " + JSON.stringify(header) + ";\n";
    index += "\n";
  });

  index += "\n";
  index += "module.exports = list;\n";

  fs.writeFile('src/list.js', index, function(err) {
    if (err) { console.log("err -> " + err); }
  });
}

fs.readdir('public/posts/', function(err, files) {
  var headers = [];

  if (err) {
    console.log("err -> " + err);
    process.exit(1);
  } else {
    files.filter(function(file) {
      return file.endsWith('.md') && !file.endsWith('.draft.md');
    }).forEach(function(file) {
      headers.push(headerFor("posts/" + file));
    });
    Promise.all(headers).then(function(vals) {
      writeToIndex(vals);
    });
  }
});