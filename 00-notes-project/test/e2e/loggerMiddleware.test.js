import { loggerMiddleware } from '../../src/middlewares/loggerMiddleware.js'; // Corrige la ruta del import
import logger from '../../src/utils/logger.js'; // Corrige la ruta del import

jest.mock('../../src/utils/logger.js'); // Corrige la ruta del import

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