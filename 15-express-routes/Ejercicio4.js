const express = require('express');

const app = express();

app.use(express.json());

app.post('/body', (req, res) => {
    const body = req.body;
    let html = '<ul>';
    for (const key in body) {
        if (body.hasOwnProperty(key)) {
            html += `<li>${key}: ${body[key]}</li>`;
        }
    }
    html += '</ul>';
    res.send(html);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});