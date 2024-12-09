import jwt from 'jsonwebtoken';

const mysecret = 'I know your secret';

const token = jwt.sign ({ 
    user: 'sebas',
    password: '1234'
}, mysecret, { expiresIn: '1h' });

console.log(token);