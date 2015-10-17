# BrowserFS Process v0.1.0
> An emulation of NodeJS's `process` variable. Used in [BrowserFS](https://github.com/jvilk/BrowserFS).

Provides only basic `process` functionality, such as changing directories and `stdout`/`stdin`/`stderr` emulation.

## Use with Browserify

You can use `bfs-process` with Browserify. Just use the following configuration:

```{js}
{
    insertGlobalVars:
    {
        "process": function () { return "require('bfs-process')" }
    }
}
```
