import {Book} from '../models/book.model.js';
import LoggerService from '../config/logger/logger-service.js';

const logger  = new LoggerService('books-controller');
export const BooksController = {

    async getAllBooks(req, res) {
        try {
			const result = await Book.find().sort('name');
			res.status(200).send(result);
		} catch (error) {
			res.status(404).send(error);
			logger.warn('GetAllBooks 404', req);
		}

	},
	
	async getBook(req, res) {
		try {
			const result = await Book.findById(req.params.id);
			res.status(200).send(result);
		} catch (error) {
			res.status(404).send(error);
			logger.warn('GetBook 404', req);
		}
	},

    async updateBook(req, res) {
        try {
			const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
				isTakenByUser: req.params.userId
			});
			res.status(200).send(book);
		} catch (error) {
			res.status(500).send(error);
			logger.warn('UpdateBook 500', req);
		}

    },

    async deleteBook(req, res) {
        try{
			const book = await Book.deleteOne({ _id: req.params.id });
			res.status(200).send(book);//do I need to return the deleted obj??
        } catch (error) {
			res.status(500).send(error);
			logger.warn('DeleteBook 500', req);
		}
    }

};
