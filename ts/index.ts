import Process from './process';
import TTY from './tty';

const process = new Process();

export let chdir = process.chdir.bind(process);
export let cwd = process.cwd.bind(process);
export let platform = process.platform;
export let uptime = process.uptime.bind(process);
export let argv = process.argv;
export let execArgv = process.execArgv;
export let stdout = process.stdout;
export let stderr = process.stderr;
export let stdin = process.stdin;
export let domain = process.domain;
export let nextTick = process.nextTick.bind(process);
export let execPath = process.execPath;
export let abort = process.abort.bind(process);
export let env = process.env;
export let exitCode = process.exitCode;
export let exit = process.exit.bind(process);
export let getgid = process.getgid.bind(process);
export let setgid = process.setgid.bind(process);
export let getuid = process.getuid.bind(process);
export let setuid = process.setuid.bind(process);
export let version = process.version;
export let versions = process.versions;
export let config = process.config;
export let kill = process.kill.bind(process);
export let pid = process.pid;
export let title = process.title;
export let arch = process.arch;
export let memoryUsage = process.memoryUsage.bind(process);
export let umask = process.umask.bind(process);
export let hrtime = process.hrtime.bind(process);
export let initializeTTYs = process.initializeTTYs.bind(process);
export let disconnect = process.disconnect.bind(process);
export let connected = process.connected;
export default {
  chdir,
  cwd,
  platform,
  uptime,
  argv,
  execArgv,
  stdout,
  stderr,
  stdin,
  domain,
  nextTick,
  execPath,
  abort,
  env,
  exitCode,
  exit,
  getgid,
  setgid,
  getuid,
  setuid,
  version,
  versions,
  config,
  kill,
  pid,
  title,
  arch,
  memoryUsage,
  umask,
  hrtime,
  initializeTTYs,
  disconnect,
  connected
};

