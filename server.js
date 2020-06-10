import config from './config/index.js';
import logger from './config/logger/logger-service.js';
import internalIp from 'internal-ip';
   
export default (app) => {
    const port = config.port;
    const host = internalIp.v4.sync();
    return app.listen(port, () =>
        logger.info(`Server is running on http://${host}:${port} `));

};