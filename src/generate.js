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
        if (lineCount < 6) {
          header.push(line);
        } else if (lineCount === 6) {
          resolve({
            filename : "/" + filename,
            path     : header[0],
            date     : header[1],
            title    : header[2],
            img      : header[3],
            imgalt   : header[4]
          });
        }
      });
    }
  );
}

function writeToIndex(headers) {
  headers = headers.sort(function(a, b) {
    return (new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  var index  = "var index = [];\n";

  headers.forEach(function(header) {
    index += "index['" + header.path + "'] = " + JSON.stringify(header) + ";\n";
    index += "\n";
  });

  index += "\n";
  index += "module.exports = index;\n";

  fs.writeFile('src/blog-index.js', index, function(err) {
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