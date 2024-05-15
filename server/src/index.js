const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

let server = https.createServer(options, function (req, res) {

	console.log('request');

	res.writeHead(200);
	res.end("hello world\n");
});

// max timeout
server.keepAliveTimeout = 2147483647;

server.listen(8000);

server.on('connection', (stream) => {
	console.log('new connection');
	stream.on('close', (stream) => {
		console.log('connection close');
	});
  });
