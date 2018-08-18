var path = require('path');
var fs = require('fs');

var loader = fs.readFileSync(path.resolve(__dirname, 'src/loader.js'), 'utf-8');
var cresolve = fs.readFileSync(require.resolve('cresolve/dist/index-system.js'), 'utf-8');

var result = require('uglify-js').minify(loader.replace(/\/\* *cresolve *\*\//, cresolve), {
	compress: { unsafe: true },
	mangle: { eval: true }
});

if(result.error) throw(result.error);

fs.writeFileSync(path.resolve(__dirname, 'loader.min.js'), result.code, 'utf-8');
