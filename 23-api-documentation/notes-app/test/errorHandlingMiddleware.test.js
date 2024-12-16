import { errorHandlingMiddleware } from '../src/middlewares/errorHandlingMiddleware.js'; // Corrige la ruta del import
import logger from '../src/utils/logger.js'; // Corrige la ruta del import

jest.mock('../src/utils/logger.js'); // Corrige la ruta del import

describe('Error Handling Middleware', () => {
    test('should return 500 and error message', () => {
        const err = new Error('Test error');
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        errorHandlingMiddleware(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Test error',
            message: 'Test error',
            stack: expect.any(String),
        });
    });

    test('should return custom status code and message', () => {
        const customErr = { statusCode: 400, message: 'Custom error' };
        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        errorHandlingMiddleware(customErr, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Custom error',
            message: 'Custom error',
            stack: process.env.NODE_ENV === 'production' ? '🥞' : expect.any(String),
        });
    });
});