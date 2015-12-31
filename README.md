# BrowserFS Process v0.1.5
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

## stdin/stdout/stderr

To avoid circular dependencies between `process` and `readable-stream`, process exposes a
`process.initializeTTYs()` function that creates the `stdout/stdin/stderr` properties.
By default, `process` will initialize these variables on the next event loop after
`process` is defined.

If this is not soon enough for your application, simply call
`process.initializeTTYs()` from your code to force it to happen sooner.
