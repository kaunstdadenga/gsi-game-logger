http = require('http');
fs = require('fs');

var dir = './tmp';
port = 3000;

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

server = http.createServer(function(req, res) {
    console.log('Handling POST request...');

    var body = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var filename = Math.floor(Date.now() / 1000)+".json"
        fs.writeFileSync("./tmp/"+ filename, body, function(err) {
        	if (err) {
        		return console.log(err)
        	}

        	console.log("GSI call saved under " + filename)
        })

        res.end('');
    });
});

server.listen(port);
console.log('Listening at ' + port);