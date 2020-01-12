const fs = require('fs');

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function snakeUpperCase(string) {
  return string.replace(/[\w]([A-Z])/g, function(m) {
    return m[0] + "_" + m[1];
  }).toUpperCase();
}

function snakeLowerCase(string) {
  return string.replace(/[\w]([A-Z])/g, function(m) {
    return m[0] + "_" + m[1];
  }).toLowerCase();
}

function replaceInFile(path, replaces){
  var rootDir = process.cwd();

  var file = `${rootDir}/${path}`;
  var data = fs.readFileSync(file, 'utf8');
  let result = data;

  for(let i = 0; i < replaces.length; i++){
    const replace = replaces[i];
    const replacement = replace.data + '\n' + replace.target;

    result = result.replace(
      [replace.target],
      replacement
    )
  }

  fs.writeFileSync(file, result, 'utf8');
}

function fileExists(path){
  return fs.existsAsync(path);
}

module.exports = {
  capitalizeFirstLetter,
  snakeUpperCase,
  snakeLowerCase,
  replaceInFile,
  fileExists
}

