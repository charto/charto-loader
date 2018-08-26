/// <reference path="types.d.ts" />

export interface SystemConfig {
	map: { [name: string]: string };
	meta: { [name: string]: any };
	packages: { [name: string]: any };
};

export interface Charto {
	createWorker: (uri: string) => { ready: Promise<Worker>, worker: Worker };
	messageQueue?: MessageEvent[];
	systemConfig: SystemConfig;
}

const charto: Charto;
export = charto;
