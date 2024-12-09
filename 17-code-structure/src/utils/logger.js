import winston from 'winston';
import path from 'path';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            handleExceptions: true,
        }),
        new winston.transports.File({
            filename: path.join('logs', 'errors.log'),
            level: 'error',
            handleExceptions: true,
        }),
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
            level: 'info',
        }),
    ],
    exitOnError: false,
});

logger.stream = {
    write: (message) => {
        logger.info(message.trim());
    },
};

export default logger;