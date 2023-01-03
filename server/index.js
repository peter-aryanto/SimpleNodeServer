const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 5000;

/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
fs.readFile(
  'client/index.html',
  (err, html) => {
    if (err) {
      throw err;
    }

    const server = http.createServer((req, res) => {
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  }
);
