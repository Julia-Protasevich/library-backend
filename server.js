import config from './config/index.js';
import LoggerService from './config/logger/logger-service.js';

const logger = new LoggerService('server');

   
export default (app) => {
    const port = config.port;
    
    return app.listen(port, () =>
        logger.info(`Server is running on http://locahost:${port}`));

};