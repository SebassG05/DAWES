import http from'node:http';

const PORT = 5000;

http.createServer((req, res) => {
    console.log('Request accepted');
    
    if(req.url === '/hola'){
        res.statusCode = 418;
        res.end('Soy una tetera Gabri ;)');
    }else if(req.url === '/negro'){
        res.end('blanco');
    }

    res.statusCode = 404;
    res.end(`<h1>Not Found</h1>`);    
}).listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});