import logger from '../config/logger/logger-service.js';

export default (err, req, res, next) => {
    res.status(500).send('Oops!');
    logger.warn("Error in controller: ", err);
};