'use strict';

/** Wrapper for defining modules inside appropriate loaders.
  * Initially unset to avoid confusing deferred scripts. */
var define;

/** Monaco loader configuration. */
var require;

/** Dojo loader configuration. */
var dojoConfig;

/** SystemJS API. */
var System;

/** Storage for Monaco and Dojo loaders. */
var charto = charto || {};

/** List of packages to preload if a bundle is not available. */
charto.preload = charto.preload || [];

charto.paths = charto.paths || {};

/** Initialize SystemJS. */

charto.initSystem = function(done) {
	// 1. Fetch SystemJS loader and Promise support.

	loadSystem();

	function loadSystem() {
		charto.require([
			'https://unpkg.com/systemjs@0.21.3/dist/system.js',
			'https://unpkg.com/bluebird@3.5.1/js/browser/bluebird.core.min.js'
		], loadConfig);
	}

	// 2. Fetch and apply SystemJS configuration.

	function loadConfig() {
		System.config({ baseURL: window.location.pathname.replace(/\/[^/]+/, '/') });
		charto.require([
			'config-npm.js',
			'config.js'
		], done);
	}
};

/** Simplest possible script loader, for fetching better loaders. */

charto.require = function(urls, done) {
	var ref = document.getElementsByTagName('script')[0];
	var loaded = 0;

	urls.map(function(url) {
		var script = document.createElement('script');

		script.async = true;
		script.onload = function() {
			script.onload = null;
			if(++loaded >= urls.length) done();
		}

		script.src = url;
		ref.parentNode.insertBefore(script, ref);
	});
};

/** Initialize AMD shim needed by Monaco and Dojo. */

charto.initLoader = function() {
	define = function(name) {
		var loader = typeof(name) == 'string' && name.substr(0, 3) == 'vs/' ? charto.monaco : charto.dojo;
		return(loader.define.apply(this, arguments));
	}

	define.amd = true;
};

charto.initMonaco = function() {
	var vsBase = 'node_modules/monaco-editor/min/';

	Array.prototype.map.call(document.getElementsByTagName('link'), function(tag) {
		if(tag.getAttribute('rel') == 'prefetch' && tag.getAttribute('href').match(/\.css$/)) {
			tag.parentNode.removeChild(tag);
		}
	});

	if(charto.production) {
		vsBase = 'https://unpkg.com/monaco-editor@0.12.0/min/';

		// Fix web worker cross origin issues.
		window.MonacoEnvironment = { getWorkerUrl: function() {
			return(URL.createObjectURL(new Blob([
				'self.MonacoEnvironment = { baseUrl: "' + vsBase + '" };',
				'importScripts("' + vsBase + (charto.paths.monacoWorker || 'vs/base/worker/workerMain.js') + '");'
			], { type: 'text/javascript' })));
		}};
	}

	require = {
		paths: {
			vs: vsBase + 'vs'
		}
	};

	/** Fetch main Monaco bundles. */

	function loadMonaco(monaco) {
		var deps = [
			'vs/editor/editor.main.nls',
			'vs/editor/editor.main'
		];

		charto.monaco = monaco;

		// Monaco loader sets exports, then gets confused by them.
		exports = void 0;

		return(new Promise(function(resolve, reject) {
			monaco.require(deps, resolve);
		}));
	}

	// Export Monaco to SystemJS modules.

	System.registerDynamic('monaco-editor', [], false, function(require, exports, module) {
		module.exports = charto.monaco.require(charto.paths.monacoApi || 'vs/editor/editor.api');
	});

	return(System.import('vs/loader').then(loadMonaco));
};

charto.initDojo = function() {
	dojoConfig = dojoConfig || {
		async: true,
		baseUrl: 'node_modules',
		packages: [
			{ name: 'dojo', location: 'dojo' },
			{ name: 'dgrid', location: 'dgrid' },
			{ name: 'dstore', location: 'dojo-dstore' }
		]
	};

	charto.preload.push(function() {
		return(System.import('dojo').then(
			function(dojo) { charto.dojo = dojo; }
		));
	});
};

/** Start application, call after inits. */

charto.start = function(main) {
	/** Fetch entire bundled app if available, otherwise only what needs preloading. */

	var bundleReady = charto.production ? System.import(charto.paths.bundle || 'dist/bundle') : Promise.reject();

	var preloadReady = bundleReady.catch(function() {
		return(Promise.all(charto.preload.map(function(load) { return(load()); })));
	});

	// Load the app and print any errors.

	preloadReady.then(function() {
		return(System.import(main));
	}).catch(function(err) {
		throw(err.originalErr || err);
	});
};

charto.initDevelop = function(done) {
	charto.initSystem(function() {
		charto.initLoader();
		charto.initDojo();
		charto.initMonaco().then(done);
	});
};
