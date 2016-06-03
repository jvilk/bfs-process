// Handles prepublishing things for cross-platform reasons.
var path = require('path'),
  child_process = require('child_process');

function checkCode(code) {
  if (code != 0) {
    throw new Error("Program exited with code " + code);
  }
}

function getNodeBinItem(name) {
  return path.resolve(".", "node_modules", ".bin", name + (process.platform === "win32" ? ".cmd" : ""));
}

var options = {
  stdio: 'inherit'
}

var tsc = getNodeBinItem('tsc');
child_process.spawn(tsc, options)
  .on('close', (code) => {
    checkCode(code);
    child_process.spawn(tsc, ['-p', path.resolve(__dirname, 'tsconfig.es6.json')], options)
      .on('close', checkCode);
  });
