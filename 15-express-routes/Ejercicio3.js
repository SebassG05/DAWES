const express = require('express');

const app = express();
const port = 3009;

app.get('/sum/:n', (req, res) => {
    const n = parseInt(req.params.n);
    if (isNaN(n) || n < 1) {
        return res.status(400).send('Invalid input');
    }

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    res.send(`The sum of all numbers from 1 to ${n} is ${sum}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
app.get('/query', (req, res) => {
    let n = parseInt(req.query.n) || 100;
    if (isNaN(n) || n < 1) {
        return res.status(400).send('Invalid input');
    }

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    res.send(`The sum of all numbers from 1 to ${n} is ${sum}`);
});