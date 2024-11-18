import http from 'node:http';

const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Request accepted');
    res.end(`${Math.random()*100}`);
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});