var http = require('http')

var fs = require('fs')
var app = http.createServer()
var mime = require('mime')
var path = require('path')
app.on('request' ,function(req, res) {
  // res.setHeader('Content-Type', 'text/html')
  if (req.url == "/") {
    req.url = "index.html"
  }
  res.setHeader('Content-Type', mime.getType(req.url));
      fs.readFile(path.join(__dirname, req.url), function(err,data) {

        res.end(data)
      })
})

app.listen('8080', function() {
  console.log('http://localhost:8080');
})