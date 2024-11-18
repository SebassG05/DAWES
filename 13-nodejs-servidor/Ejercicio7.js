const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const number = parseInt(queryObject.number);

    if (!isNaN(number)) {
        let result = [];
        for (let i = 1; i <= number; i++) {
            if (i % 3 === 0 && i % 5 === 0) {
                result.push('FizzBuzz');
            } else if (i % 3 === 0) {
                result.push('Fizz');
            } else if (i % 5 === 0) {
                result.push('Buzz');
            } else {
                result.push(i);
            }
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid number');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});