import mongoose from 'mongoose';
import appConfig from './config/index.js';
import { seedUsers, seedBooks} from './seeder.js';
import environment from './constants/environment.js';

/** connect to mongoDB with feedback */
const databaseConnect = async (config = appConfig) => {
	try {
		await mongoose.connect(config.database);
		console.log('Connected to MongoDB!');
		/** only populate database in 'dev' or 'development' mode */
		if (process.env.NODE_ENV === environment.DEVELOPMENT || environment.DEV) {
			/** execute seeders */
			await seedUsers();
			await seedBooks();

		}
	} catch (error) {
		console.log(`Something went wrong ${error}`);
	}
};

export default databaseConnect;