import * as Comlink from 'comlink';

// const sharedWorker = new SharedWorker("@/comlinkWorker/multiplierSharedWorker.js");

const sharedWorker = new SharedWorker(new URL('./shared-worker', import.meta.url)); 
console.log("sharedWorker", sharedWorker);
const worker = Comlink.wrap(sharedWorker.port);

export const toUpperCase = worker.toUpperCase
export const registerTab = worker.registerTab;
export const listTab = worker.listTab;