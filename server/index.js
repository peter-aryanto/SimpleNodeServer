const http = require('http');
const fs = require('fs');
const url = require("url");
const path = require("path");

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
/*
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
*/
const server = http.createServer(function(request, response) {
  let uri = url.parse(request.url).pathname;
  const lastIndexOfSlash = uri.lastIndexOf('/');
  uri = uri.substring(0, lastIndexOfSlash + 1) + 'client/' + uri.substring(lastIndexOfSlash + 1);
  let filename = path.join(process.cwd(), uri);
  console.log('');
  console.log(`URI: ${uri}`);
  console.log(`File/Path: ${filename}`);

  //const contentTypesByExtension = {
  //  '.html': "text/html",
  //  '.css':  "text/css",
  //  '.js':   "text/javascript"
  //};

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      //const headers = {};
      //const contentType = contentTypesByExtension[path.extname(filename)];
      //if (contentType) headers["Content-Type"] = contentType;
      //response.writeHead(200, headers);
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
});

server.listen(
  port,
  hostname,
  () => console.log(`Server running at http://${hostname}:${port}/`)
);
