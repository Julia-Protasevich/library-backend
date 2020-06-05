import faker from 'faker';
import {User} from './models/user.model.js';
import {Book} from './models/book.model.js';
import LoggerService from './config/logger/logger-service.js';

const logger = new LoggerService('seeder');

export const seedUsers = async () => {
	try {
        const usersCollection = await User.find();
        
		if (usersCollection.length > 1) {
			return;
        }
        
		const quantity = 10;
        let users = [];
        
		for (let i = 0; i < quantity; i++) {
			users.push(
				new User({
					displayName: faker.internet.userName(),
                    role: 'USER',
                    email: faker.internet.email(),
                    password: faker.internet.password()
				})
			);
		}
		await User.remove();
		await Promise.all(
			users.map(user => User.create(user))
		);
		logger.info('Users DONE');
	} catch (error) {
		logger.error('Problem in seeding Users', error);
	}
};

export const seedBooks = async () => {
	try {
        const booksCollection = await Book.find();
        
		if (booksCollection.length > 1) {
			return;
        }
        
		const quantity = 10;
        let books = [];
        
		for (let i = 0; i < quantity; i++) {
			books.push(
				new Book({
					name: faker.lorem.words(2),
					author: faker.name.firstName() + ' ' + faker.name.lastName(),
					description: faker.lorem.text(),
					imageURL: faker.internet.avatar()
				})
			);
		}
		await Book.remove();
		await Promise.all(
			books.map(book => Book.create(book))
		);
		logger.info('Books DONE');
	} catch (error) {
		logger.error('Problem in seeding Books',error);
	}
};

