import logger from '../config/logger/logger-service.js';

export default (err, req, res, next) => {
    logger.warn("Error in controller: ", err);
    res.status(err.status || 500).json('Oops!');
};