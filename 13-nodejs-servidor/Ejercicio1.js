import http from'node:http';

const server = http.createServer((req, res) => {
    console.log('Request accepted');
    res.end('Hello World!\n');
});

server.listen(4000);{
    console.log('Server listening in port 4000');
}