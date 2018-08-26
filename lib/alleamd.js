var fs = require('fs');

var name = process.argv[2];
var codePath = require('path').join('packages', 'node_modules', name, process.argv[3] || 'dist/index-amd.js');
var code = fs.readFileSync(codePath, { encoding: 'utf-8' });

code = code.replace(/\"src\//g, '"' + name + '/');

fs.writeFileSync(codePath, code, { encoding: 'utf-8' });
