import winston from 'winston';

const INFO = 'info';
const DEBUG = 'debug';
const ERROR = 'error';
const WARN = 'warn';

const loggerService = Symbol();
class LoggerService {
  constructor() {

    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf((info) => this.formatMessage(info))
        )
        }),
        new winston.transports.File({
          filename: `./logs/error.log`,
          level: ERROR,
          format: winston.format.printf((info) => this.formatMessage(info))
        }),
        new winston.transports.File({
          filename: `./logs/combined.log`,
          format: winston.format.printf((info) => this.formatMessage(info))
        })
      ]
   });

   this.logger = logger;
  }

  formatMessage(info) {
    const message = `${this.UtcDate} | ${info.level} | ${info.message} | ${info.obj ? `data:${JSON.stringify(info.obj)} | ` : ''}`;

    return message;
  }

  static get instance() {
    if(!this[loggerService]){
      this[loggerService] = new LoggerService();
    }

    return this[loggerService];
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
