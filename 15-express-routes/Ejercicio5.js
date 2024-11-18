const express = require('express');

const router = express.Router();

router.get('/dog', (req, res) => {
    res.json({ grow: 'guau guau' });
});

router.get('/cat', (req, res) => {
    res.json({ grow: 'miau' });
});

router.get('/bird', (req, res) => {
    res.json({ grow: 'pio pio' });
});

module.exports = router;