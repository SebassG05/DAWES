const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const name = queryObject.name || 'World';

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello ${name}!`);
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});