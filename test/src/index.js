var https = require('https');

const agent = new https.Agent({
    keepAlive: true
});

var options = {
	agent: agent,
	host: '127.0.0.1',
	port: 8000,
	path: '/upload',
	method: 'GET',
	rejectUnauthorized: false
};

for ( var i = 0; i < 10; ++i )
{
	var req = https.request(options, function(res) {
	console.log('STATUS: ' + res.statusCode);
	console.log('HEADERS: ' + JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
	});
	});

	req.on('error', function(e) {
	console.log('problem with request: ' + e.message);
	});
	req.end();
}
