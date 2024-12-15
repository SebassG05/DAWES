import { compare } from 'bcrypt';

const validateToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const isValid = await compare('I know your secret', token);
        if (isValid) {
            next();
        } else {
            res.status(401).send('Invalid Token');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

export default validateToken;