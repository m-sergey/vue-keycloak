// Install 
self.addEventListener('install', function(event) {
    console.log("install");
});
 
// Activate 
self.addEventListener('activate', function(event) {
    console.log("activet");
});
 


// Receive message from main file
self.onmessage = function(e) {
    console.log("onmessage: ", e.data);
   
    const { type } = JSON.parse(e.data);

    const workerResult = { "type": type };

    console.log("messagee type: ", type);

    // Send message to main file
    self.postMessage(workerResult);
}
