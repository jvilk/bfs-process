import Process = require('./process');
import TTD = require('./tty');
var process = new Process();

// Manually export the individual public functions of Process.
// Required because some code will invoke functions off of the module.
// e.g. the `async` library sets `async.nextTick = process.nextTick`,
// so the 'this' object is set to `async` when it is invoked.
export var chdir = (dir: string) => process.chdir(dir);
export var cwd = () => process.cwd();
export var platform = process.platform;
export var uptime = () => process.uptime();
export var argv = process.argv;
export var stdout = process.stdout;
export var stderr = process.stderr;
export var stdin = process.stdin;
export var nextTick = function() {
  return process.nextTick.apply(process, arguments);
};
