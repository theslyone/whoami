var http = require("http"), express = require("express");
var parser = require('ua-parser-js');

var app = express();

app.use('/', function(req, res){
  var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

     var userAgent =  req.headers['user-agent'];
     var language = req.headers["accept-language"]
     res.writeHead(200);

     var data = {ipaddress: ip, language: language, software: userAgent };
     res.end(JSON.stringify(data));

     //res.write("\n");
     // get user-agent header
    //var ua = parser(req.headers['user-agent']);
    // write the result as response
    //res.end(JSON.stringify(ua, null, '  '));
});

var server = http.createServer(app);
server.listen(process.env.PORT || 8080);
console.log("app started");
