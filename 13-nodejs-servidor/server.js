import http from'node:http';

const PORT = 3001;

const server = http.createServer((req, res) => {
    console.log('Request accepted');
    res.write(`${Math.random()*100}`);
    res.end();
}).listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});


