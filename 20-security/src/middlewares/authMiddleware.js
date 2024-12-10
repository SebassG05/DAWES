import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config.js';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

export function generateToken(username) {
    return jwt.sign({ username }, config.JWT_SECRET, { expiresIn: '1h' });
}

export function authenticateAdmin(req, res) {
    const { username, password } = req.body;
    if (username !== config.ADMIN_USERNAME) {
        return res.status(403).send('Usuario no autorizado');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    if (!bcrypt.compareSync(password, hashedPassword)) {
        return res.status(403).send('Contraseña incorrecta');
    }

    const token = generateToken(username);
    res.json({ token });
}