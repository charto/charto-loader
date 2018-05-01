# charto-loader

This is a collection of loader scripts for Charto style projects:

<dl>
<dt>loader.js</dt>
<dd>For browsers, loads <a href="https://github.com/systemjs/systemjs">SystemJS</a>,
<a href="https://github.com/dojo/dojo">Dojo 1.x</a> and
<a href="https://github.com/Microsoft/monaco-editor">Monaco</a>.</dd>
<dt>dojo-loader.js</dt>
<dd>Minimal shim for loading Dojo using SystemJS.</dd>
<dt>dojo-require.js</dt>
<dd>Minimal shim used by dojo-loader to support <code>require</code> inside Dojo when bundled.</dd>
<dt>fixamd.js</dt>
<dd>Renames <code>src</code> to the package name in paths inside TypeScript-compiled AMD bundles.</dd>
<dt>alleamd.js</dt>
<dd>Like <b>fixamd.js</b> but looks under <code>packages/node_modules/&lt;package name&gt;</code> to find the bundle.</dd>
<dt>process.js</dt>
<dd>Exports a Node.js <code>process</code> object with <code>NODE_ENV</code> set to <code>production</code>. Needed for example by React.</dd>
<dt>process-dev.js</dt>
<dd>Like <b>process.js</b> but <code>NODE_ENV</code> set to <code>development</code>.</dd>
<dt>undefined.js</dt>
<dd>Exports <code>undefined</code>, needed for bundling Dojo.</dd>
</dl>

## Usage

In HTML code you can put:

```HTML
<html><head>
<script src="https://unpkg.com/charto-loader@0.1.1/loader.js"></script>
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
tsc && fixamd my-project ./index.js
```

or:

```bash
tsc -p src && fixamd my-project
```

It will rename paths like `src/file` to `my-project/file` inside `./index.js`.
If the second argument is omitted, it defaults to `dist/index-amd.js`.

For [alle](https://github.com/boennemann/alle) projects, use `alleamd` instead.
Called like above, it would patch `packages/node_modules/my-project/index.js` or
`packages/node_modules/my-project/dist/index-amd.js`.

# License

[The MIT License](https://raw.githubusercontent.com/charto/charto-loader/master/LICENSE)

Copyright (c) 2018 BusFaster Ltd
