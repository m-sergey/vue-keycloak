import * as Comlink from 'comlink';

const Worker = {    
    toUpperCase(msg) {
        console.log("test");
        return msg.toUpperCase();
    },

    registerTab(tabId) {
        if(!this.tabs) {
            this.tabs = new Array();
        }

        this.tabs.push(tabId);
    },

    listTab() {
        if(!this.tabs) {
            return "<empty>";
        }

        return this.tabs.join(",");
    }
};

self.onconnect = function (event) {
    const port = event.ports[0];
    console.log("port");
    Comlink.expose(Worker, port);
};

