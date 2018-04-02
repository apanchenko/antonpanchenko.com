var fs = require("fs");
var path = require("path");

// cleanup 'out' git repo
clean('out', '.git');

// move build to git repo
move('build', 'out');

// delete empty build folder
fs.rmdirSync('build');


function clean(dir, except) {
    var files = fs.readdirSync(dir);

    files.forEach(function(file) {
        if (file == except)
            return;
        var filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            clean(filepath);
            fs.rmdirSync(filepath);
        }
        else {
            fs.unlinkSync(filepath);
        }
    }); 
}

function move(from, to) {
    fs.readdirSync(from).forEach(function(file) {
        var filepath = path.join(from, file);

        fs.renameSync(path.join(from, file), path.join(to, file));
    }); 
}