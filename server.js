const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const port = 4000;

const httpServer = http.createServer(requestResponseHandler);
httpServer.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function requestResponseHandler(req, res) {
  console.log(`Request came: ${req.url}`);
  if (req.url === '/') {
    sendResponse('loader.js', 'text/javascript', res)
  }
}

function sendResponse(url, contentType, res) {
  let file = path.join(__dirname, url);
  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.write(`File '${file}' Not Found!`);
      res.end();
      console.log("Response: 404 ${file}, err");
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(content);
      res.end();
      console.log(`Response: 200 ${file}`);
    }
  })
}
