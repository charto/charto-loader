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
<dt>process.js</dt>
<dd>Exports a Node.js `process` object with `NODE_ENV` set to `production`. Needed for example by React.</dd>
<dt>process-dev.js</dt>
<dd>Exports a Node.js `process` object with `NODE_ENV` set to `development`.</dd>
<dt>undefined.js</dt>
<dd>Exports `undefined`, needed by Dojo when bundled.</dd>
</dl>

## Usage

In HTML code you can put:

```HTML
<html><head>
<script src="https://unpkg.com/charto-loader@0.1.0/index.js"></script>
<script type="text/javascript">

window.onload = function() {
	// Use a bundle if available.
	charto.production = true;

	// Set bundle path. Could be omitted, this is the default.
	charto.paths.bundle = 'dist/bundle';

	// Load Bluebird, SystemJS and its config.
	charto.initSystem(function() {
		// Use SystemJS to load the app.
		// Will look for the bundle first.
		charto.start('dist/MyApp');
	});
};

</script>
```

To use `fixamd`, run the TypeScript compiler from `scripts` in `package.json` like:

```bash
tsc -p src && fixamd my-project
```

or:

```bash
tsc && fixamd my-project ./index.js
```

It will rename paths like `src/index` to `my-project/index` inside `./index.js`.
If the second argument is omitted, it defaults to `dist/index-amd.js`.

# License

[The MIT License](https://raw.githubusercontent.com/charto/charto-loader/master/LICENSE)

Copyright (c) 2018 BusFaster Ltd
