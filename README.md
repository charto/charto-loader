# charto-loader

This is a collection of loader scripts for Charto style projects:

<dl>
<dt>index.js</dt>
<dd>For browsers, loads <a href="https://github.com/systemjs/systemjs">SystemJS</a>,
<a href="https://github.com/dojo/dojo">Dojo 1.x</a> and
<a href="https://github.com/Microsoft/monaco-editor">Monaco</a>.</dd>
<dt>dojo-loader.js</dt>
<dd>Minimal shim for loading Dojo using SystemJS.</dd>
<dt>dojo-require.js</dt>
<dd>Minimal shim used by dojo-loader to support `require` inside Dojo when bundled.</dd>
<dt>fixamd.js</dt>
<dd>Renames `src` to the package name in paths inside TypeScript-compiled AMD bundles.</dd>
<dt>undefined.js</dt>
<dd>Exports `undefined`, needed by Dojo when bundled.</dd>
<dt>process.js</dt>
<dd>Exports a Node.js `process` object with `NODE_ENV` set to `production`. Needed for example by React.</dd>
<dt>process-dev.js</dt>
<dd>Exports a Node.js `process` object with `NODE_ENV` set to `development`.</dd>
</dl>

# License

[The MIT License](https://raw.githubusercontent.com/charto/charto-loader/master/LICENSE)

Copyright (c) 2018 BusFaster Ltd
