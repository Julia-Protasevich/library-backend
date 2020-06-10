/**
 * How to rename it properly and where does it belong??
 */

 import process from 'process';
 import logger from './logger-service.js';
 
process.on('uncaughtException', err => {
    logger.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled rejection at ', promise, `reason: ${err.message}`);
    process.exit(1);
});

process.on('SIGTERM', err => {
    logger.warn(`SIGTERM  triggered`);
    process.exit(0);
});
process.on('SIGINT', err => {
    logger.warn(`SIGINT  triggered`);
    process.exit(0);
});

export default process;