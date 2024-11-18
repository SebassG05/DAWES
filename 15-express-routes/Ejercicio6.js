const express = require('express');

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.status(404).json({
        code: 404,
        error: "Not Found",
        message: "Error: Path not found"
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});