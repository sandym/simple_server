const https = require('https');
const os = require('os');
const fs = require('fs');

const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};

var connectionId = 0;
var connectionReuse = 0;

let server = https.createServer(options, function (req, res) {

	console.log('request');

	res.writeHead(200);
	var response = "";
	response += `hostname = ${os.hostname()}\n`;
	response += `connection id = ${connectionId}\n`;
	response += `connection reuse = ${connectionReuse}\n`;
	++connectionReuse;
	res.end(response);
});

// max timeout
server.keepAliveTimeout = 2147483647;

server.listen(8000);

server.on('connection', (stream) => {
	console.log('new connection');
	++connectionId;
	stream.on('close', (stream) => {
		console.log('connection close');
		connectionReuse = 0;
	});
});
