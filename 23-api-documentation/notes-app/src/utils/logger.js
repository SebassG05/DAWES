import winston from 'winston';
import path from 'path';

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    })
);

const consoleTransport = new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    handleExceptions: true,
});

const fileTransportError = new winston.transports.File({
    filename: path.join('logs', 'errors.log'),
    level: 'error',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
});

const fileTransportCombined = new winston.transports.File({
    filename: path.join('logs', 'combined.log'),
    level: 'info',
    maxsize: 5242880, // 5MB
    maxFiles: 5,
});

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        consoleTransport,
        fileTransportError,
        fileTransportCombined,
    ],
    exitOnError: false,
});

logger.stream = {
    write: (message) => {
        logger.info(message.trim());
    },
};

export default logger;