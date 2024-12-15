import { authMiddleware } from './authMiddleware.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

describe('Auth Middleware', () => {
    const req = {
        headers: {
            authorization: `Bearer ${jwt.sign({ username: process.env.ADMIN_USERNAME }, process.env.JWT_SECRET, { expiresIn: '1h' })}`
        }
    };
    const res = {};
    const next = jest.fn();

    test('should call next if token is valid', () => {
        authMiddleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    test('should return 401 if no token is provided', () => {
        const reqWithoutToken = { headers: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        authMiddleware(reqWithoutToken, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' });
    });

    test('should return 401 if token is invalid', () => {
        const reqWithInvalidToken = { headers: { authorization: 'Bearer invalidtoken' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        authMiddleware(reqWithInvalidToken, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to authenticate token' });
    });
});
