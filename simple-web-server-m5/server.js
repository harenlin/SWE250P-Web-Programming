const fs = require('fs');
const http = require('http');
const path = require('path');

const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname + '/dist')));

const server = http.createServer(app, (req, res) => {
  	if (req.url === '/') { // Serve a simple static HTML file
	    fs.readFile(path.join(__dirname + '/dist/index.html'), 'utf8', (err, data) => {
    		if (err) { // Error handling
        		res.writeHead(500, {'Content-Type': 'text/plain'});
		        res.end('Internal Server Error');
    		} else {
        		res.writeHead(200, {'Content-Type': 'text/html'});
    			res.end(data);
    		}
    	});
  	} else { 
    	res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end('Not Found');
	}
});

const port = 3000;
const hostname = '127.0.0.1';

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
