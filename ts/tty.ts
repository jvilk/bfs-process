import stream = require('stream');

class TTY extends stream.Duplex {
  public isRaw: boolean = false;
  public columns: number = 80;
  public rows: number = 120;
  public isTTY: boolean = true;

  constructor() {
    super();
  }

  /**
   * Toggle raw mode.
   */
  public setRawMode(mode: boolean): void {
    if (this.isRaw !== mode) {
      this.isRaw = mode;
      // [BFS] TTY implementations can use this to change their event emitting
      //       patterns.
      this.emit('modeChange');
    }
  }

  /**
   * [BFS] Update the number of columns available on the terminal.
   */
  public changeColumns(columns: number): void {
    if (columns !== this.columns) {
      this.columns = columns;
      // Resize event.
      this.emit('resize');
    }
  }

  /**
   * [BFS] Update the number of rows available on the terminal.
   */
  public changeRows(rows: number): void {
    if (rows !== this.rows) {
      this.rows = rows;
      // Resize event.
      this.emit('resize');
    }
  }

  /**
   * Returns 'true' if the given object is a TTY.
   */
  public static isatty(fd: any): fd is TTY {
    return fd && fd instanceof TTY;
  }
}

export = TTY;
