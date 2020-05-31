import merge from 'lodash.merge';
import devConfig from './dev.js';
import prodConfig from './prod.js';
import environment from '../constants/environment.js';

process.env.NODE_ENV = process.env.NODE_ENV || environment.DEVELOPMENT;
const env = process.env.NODE_ENV;

const baseConfig = {
	secret: {}
};

let envConfig = {};

switch (env) {
	case environment.DEVELOPMENT:
	case environment.DEV:
		envConfig = devConfig;
		break;

	case environment.PRODUCTION:
	case environment.PROD:
		envConfig = prodConfig;
		break;

	default:
		envConfig = devConfig;
};

export default merge(baseConfig, envConfig);
