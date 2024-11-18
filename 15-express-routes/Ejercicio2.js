const express = require('express');

const app = express();
const port = 3009;

app.get('/params/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hola ${name}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});