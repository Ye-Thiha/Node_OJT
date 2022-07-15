var http = require('http');  
//create a server object:  
  
http.createServer(function (req, res) {  
    res.write('Hello World!,Hello There'); //write a response to the client  
    res.end(); //end the response  
}).listen(5000); //the server object listens on port 8080   
  
// Console will print the message  
console.log('Server running at 5000'); 

var http = require("http");

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World\n');
}).listen(8001);

console.log('Server running at http: // 127.0.0.1:8081/');