// JSON contains any data.

declare module '*.json' {
	const data: any;
	export = data;
}

// WebGL vertex shaders are plain text.

declare module '*.vert' {
	const data: string;
	export = data;
}

// WebGL fragment shaders are plain text.

declare module '*.frag' {
	const data: string;
	export = data;
}
