const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    console.log(`Token: ${token}`);
    res.send('Token received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});