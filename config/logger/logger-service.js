import winston from 'winston';

class LoggerService {
  constructor(route) {
    this.logData = null;
    this.route = route;

    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `./logs/${route}.log`
        })
      ],
      format: winston.format.printf((info) => {
        let message = `${this.dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `;
        message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message;
        message = this.logData ? message + `logData:${JSON.stringify(this.logData)} | ` : message;
        return message;
      })
   });

   this.logger = logger;
  }

  dateFormat() {
    return new Date(Date.now()).toUTCString();
  }

  setLogData(logData) {
    this.logData = logData;
  }

  async info(message) {
    this.logger.log('info', message);
  } 

  async info(message, obj) {
    this.logger.log('info', message, {
      obj
    });
  }
  async debug(message) {
    this.logger.log('debug', message);
  }
  async debug(message, obj) {
    this.logger.log('debug', message, {
      obj
    });
  }
  async error(message) {
    this.logger.log('error', message);
  }
  async error(message, obj) {
    this.logger.log('error', message, {
      obj
    });
  }
  async warn(message) {
    this.logger.log('warn', message);
  }
  async warn(message, obj) {
    this.logger.log('warn', message, {
      obj
    });
  }
}
export default LoggerService;