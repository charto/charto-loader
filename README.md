# charto-loader

This is the most awesome JavaScript / TypeScript module loader. It combines the superpowers of:

- [SystemJS](https://github.com/systemjs/systemjs#readme) for in-browser development without any tooling.
- [cresolve](https://github.com/charto/cresolve#readme) for fully automatic configuration using Node.js module resolution.

## Features

- Looks for `node_modules` and inside, in the same places Node.js would.
- Automatic [UNPKG](https://unpkg.com/) fallback when a package is not yet installed.
- Handles `browser` mappings in `package.json` files.
- Transpiles ES6 using TypeScript compiler (by default).
- Generates SystemJS configuration JSON to easily eliminate dependency on this library and switch to vanilla SystemJS.

## Usage

Import a main `App.ts` file from HTML like this:

```HTML
<script src="//unpkg.com/charto-loader@1/loader.min.js"></script>
<script>

charto.initSystemTS(function() {
	System.import('./App.ts');
});

</script>
```

You can write `./src/App` (`.ts` or `.tsx` extension is added) or `./dist/App` (`.js` extension is added) instead.
If your project is not TypeScript (**but why?**), use `charto.initSystem` and
add a first argument with a SystemJS configuration object or configuration file address,
setting up a transpiler if necessary.

It loads [core-js](https://github.com/zloirock/core-js#readme) if `Promise` support is missing (mainly in IE 11) and
[SystemJS](https://github.com/systemjs/systemjs#readme) from a CDN or under `node_modules` if present.
[cresolve](https://github.com/charto/cresolve#readme) is included in the loader bundle.

`loader.min.js` is the minified version, `loader.src.js` is for debugging without minification.

To print the auto-generated SystemJS configuration, use:

```TypeScript
import charto from 'charto-loader';

console.log(JSON.stringify(charto.systemConfig, null, '\t'));
```

# License

[The MIT License](https://raw.githubusercontent.com/charto/charto-loader/master/LICENSE)

Copyright (c) 2018- BusFaster Ltd
