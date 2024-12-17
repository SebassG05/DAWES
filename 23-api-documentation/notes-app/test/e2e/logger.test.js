import logger from '../../src/utils/logger.js';

describe('Logger', () => {
    test('should log info messages', () => {
        const infoSpy = jest.spyOn(logger, 'info');
        logger.info('Test info message');
        expect(infoSpy).toHaveBeenCalledWith('Test info message');
    });

    test('should log error messages', () => {
        const errorSpy = jest.spyOn(logger, 'error');
        logger.error('Test error message');
        expect(errorSpy).toHaveBeenCalledWith('Test error message');
    });

    test('should write to stream', () => {
        const infoSpy = jest.spyOn(logger, 'info');
        logger.stream.write('Test stream message\n');
        expect(infoSpy).toHaveBeenCalledWith('Test stream message');
    });
});
