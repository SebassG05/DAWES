const express = require('express');
const app = express();
const port = 3012;

app.use(express.json());

app.get('/users', (req, res) => {
    res.status(200).json(users);
});


app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.status(200).json(user);
});


app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});


app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name;
    user.email = req.body.email;
    res.status(200).json(user);
});


app.patch('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    res.status(200).json(user);
});


app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');

    users.splice(userIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});