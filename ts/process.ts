import _path = require('path');
import TTY = require('./tty');

// Path depends on process. Avoid a circular reference by dynamically including path when we need it.
var path: typeof _path = null;

class Item {
  private fun: Function;
  private array: any[];
  constructor(fun: Function, array: any[]) {
    this.fun = fun;
    this.array = array;
  }

  public run(): void {
    this.fun.apply(null, this.array);
  }
}

/**
 * Contains a queue of Items for process.nextTick.
 * Inspired by node-process: https://github.com/defunctzombie/node-process
 */
class NextTickQueue {
  private _queue: Item[] = [];
  private _draining = false;
  // Used/assigned by the drainQueue function.
  private _currentQueue: Item[] = null;
  private _queueIndex = -1;

  public push(item: Item): void {
    if (this._queue.push(item) === 1 && !this._draining) {
      setTimeout(() => this._drainQueue(), 0);
    }
  }

  private _cleanUpNextTick() {
    this._draining = false;
    if (this._currentQueue && this._currentQueue.length) {
      this._queue = this._currentQueue.concat(this._queue);
    } else {
      this._queueIndex = -1;
    }
    if (this._queue.length) {
      this._drainQueue();
    }
  }

  private _drainQueue() {
    if (this._draining) {
      return;
    }
    // If an Item throws an unhandled exception, this function will clean things up.
    var timeout = setTimeout(() => this._cleanUpNextTick());
    this._draining = true;

    var len = this._queue.length;
    while(len) {
      this._currentQueue = this._queue;
      this._queue = [];
      while (++this._queueIndex < len) {
        if (this._currentQueue) {
          this._currentQueue[this._queueIndex].run();
        }
      }
      this._queueIndex = -1;
      len = this._queue.length;
    }
    this._currentQueue = null;
    this._draining = false;
    clearTimeout(timeout);
  }
}

/**
 * Partial implementation of Node's `process` module.
 * We implement the portions that are relevant for the filesystem.
 * @see http://nodejs.org/api/process.html
 * @class
 */
class Process {
  private startTime = Date.now();

  private _cwd: string = '/';
  /**
   * Changes the current working directory.
   *
   * **Note**: BrowserFS does not validate that the directory actually exists.
   *
   * @example Usage example
   *   console.log('Starting directory: ' + process.cwd());
   *   process.chdir('/tmp');
   *   console.log('New directory: ' + process.cwd());
   * @param [String] dir The directory to change to.
   */
  public chdir(dir: string): void {
    // XXX: Circular dependency hack.
    if (path === null) {
      path = require('path');
    }
    this._cwd = path.resolve(dir);
  }
  /**
   * Returns the current working directory.
   * @example Usage example
   *   console.log('Current directory: ' + process.cwd());
   * @return [String] The current working directory.
   */
  public cwd(): string {
    return this._cwd;
  }
  /**
   * Returns what platform you are running on.
   * @return [String]
   */
  public platform: string = 'browser';
  /**
   * Number of seconds BrowserFS has been running.
   * @return [Number]
   */
  public uptime(): number {
    return ((Date.now() - this.startTime) / 1000) | 0;
  }

  public argv: string[] = [];
  public stdout = new TTY();
  public stderr = new TTY();
  public stdin = new TTY();

  private _queue: NextTickQueue = new NextTickQueue();

  public nextTick(fun: any, ...args: any[]) {
    this._queue.push(new Item(fun, args));
  }
}

export = Process;