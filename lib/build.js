// This file is part of charto-loader, copyright (c) 2018- BusFaster Ltd.
// Released under the MIT license, see LICENSE.

var path = require('path');
var fs = require('fs');

var loader = fs.readFileSync(path.resolve(__dirname, '../src/loader.js'), 'utf-8');
var cresolve = fs.readFileSync(require.resolve('cresolve/dist/index-system.js'), 'utf-8');

var src = loader.replace(/\/\* *cresolve *\*\//, cresolve);

var min = require('uglify-js').minify(src, {
	compress: { unsafe: true },
	mangle: { eval: true }
});

if(min.error) throw(min.error);

fs.writeFileSync(path.resolve(__dirname, '../loader.src.js'), src, 'utf-8');
fs.writeFileSync(path.resolve(__dirname, '../loader.min.js'), min.code, 'utf-8');
