import http from'node:http';

http.createServer((req, res) => {
    console.log('Request accepted');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>Hello World!</h1></body></html>`);
}).listen(3000);{
    console.log('Server listening in port 3000');
}