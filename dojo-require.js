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
