import merge from 'lodash.merge';
import devConfig from './dev.js';
import prodConfig from './prod.js';
import {DEV, DEVELOPMENT, PROD, PRODUCTION} from '../constants/environment.js';

process.env.NODE_ENV = process.env.NODE_ENV || DEVELOPMENT;
const env = process.env.NODE_ENV;

const baseConfig = {
	secret: {}
};

let envConfig = {};

switch (env) {
	case DEVELOPMENT:
	case DEV:
		envConfig = devConfig;
		break;

	case PRODUCTION:
	case PROD:
		envConfig = prodConfig;
		break;

	default:
		envConfig = devConfig;
};

export default merge(baseConfig, envConfig);
