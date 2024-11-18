import http from'node:http';

const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const filePath = path.join(__dirname, 'Ejercicio5.html');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Error loading the HTML file');
        } else {
            res.end(data);
        }
    });
}).listen(3000);