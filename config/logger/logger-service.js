import winston from 'winston';

const INFO = 'info',
      DEBUG = 'debug',
      ERROR = 'error',
      WARN = 'warn';

class LoggerService {
  constructor(route) {
    this.route = route;

    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `./logs/${route}.log`
        })
      ],
      format: winston.format.printf((info) => {
        const message = `${this.UtcDate} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | ${info.obj ? `data:${JSON.stringify(info.obj)} | ` : ''}`;

        return message;
      })
   });

   this.logger = logger;
  }

  get UtcDate() {
    return new Date(Date.now()).toUTCString();
  }

  async info(message) {
    return this.logger.log(INFO, message);
  } 

  async info(message, obj) {
    return this.logger.log(INFO, message, {
      obj
    });
  }

  async debug(message) {
    return this.logger.log(DEBUG, message);
  }

  async debug(message, obj) {
    return this.logger.log(DEBUG, message, {
      obj
    });
  }

  async error(message) {
    return this.logger.log(ERROR, message);
  }

  async error(message, obj) {
    return this.logger.log(ERROR, message, {
      obj
    });
  }

  async warn(message) {
    return this.logger.log(WARN, message);
  }

  async warn(message, obj) {
    return this.logger.log(WARN, message, {
      obj
    });
  }
}

export default LoggerService;
