import express from 'express';

const PORT = 3008;

const server = express();


server.use(express.json());

server.get('/api', (_, res) => {
    res.statusCode = 418;
    res.send('<h1>pong</h1>');
});

server.get('/random', (_, res) => {
    res.send(`<h1>${Math.random() * 100}</h1>`);
});


server.post('/api', (req, res) => {
    const data = req.body;
    res.statusCode = 201;
    res.send(`<h1>Data received: ${JSON.stringify(data)}</h1>`);
});

server.put('/api', (req, res) => {
    const data = req.body;
    res.statusCode = 200;
    res.send(`<h1>Data updated: ${JSON.stringify(data)}</h1>`);
});

server.delete('/api', (_, res) => {
    res.statusCode = 204;
    res.send();
});

server.use((_, res) => {
    res.statusCode = 404;
    res.send('<h1>404 Not Found</h1>');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});