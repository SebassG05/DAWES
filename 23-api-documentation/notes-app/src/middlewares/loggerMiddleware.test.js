import { loggerMiddleware } from './loggerMiddleware.js';
import logger from '../utils/logger.js';

jest.mock('../utils/logger.js');

describe('Logger Middleware', () => {
    test('should log the request method and url', () => {
        const req = { method: 'GET', url: '/test' };
        const res = {};
        const next = jest.fn();

        loggerMiddleware(req, res, next);

        expect(logger.info).toHaveBeenCalledWith(expect.stringContaining(`GET /test`));
        expect(next).toHaveBeenCalled();
    });
});