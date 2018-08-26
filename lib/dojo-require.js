// This file is part of charto-loader, copyright (c) 2018- BusFaster Ltd.
// Released under the MIT license, see LICENSE.

module.exports = {
	toUrl: function (name) {
		var parts = name.match(/(.*)(\.[^.]+)$/);
		var ext = '.js';

		if(parts) {
			name = parts[1];
			ext = parts[2];
		}

		return(System.resolveSync('dojo/' + name).replace(/\.js$/, ext));
	}
};
