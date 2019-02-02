let http = require('http')

let fs = require('fs')
let app = http.createServer()
let mime = require('mime')
let path = require('path')
app.on('request' ,(req, res) =>{
  // res.setHeader('Content-Type', 'text/html')
  if (req.url == "/") {
    req.url = "index.html"
  }
  res.setHeader('Content-Type', mime.getType(req.url));
      fs.readFile(path.join(__dirname, req.url), function(err,data) {

        res.end(data)
      })
})

app.listen('8080', () => {
  console.log('http://localhost:8080');
})