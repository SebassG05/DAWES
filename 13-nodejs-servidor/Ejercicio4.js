import http from'node:http';

const PORT = 5000;

http.createServer((req, res) => {
    console.log('Request accepted');
 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello World!</h1></body></html>');

    res.statusCode = 404;
    res.end(`<h1>Not Found</h1>`);    
}).listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});