import {Book} from '../models/book.model.js';

const NO_BOOKS_FOUND_FOR_ID = 'No books found for given ID';

export const BooksController = {

	async getAllBooks(req, res, next) {
		try {
			const isAdmin = false;//TODO 
			let result = null;
			if(isAdmin) {
				result = await Book.find().sort('name');
			} else {
				result = await Book.find({isTakenByUser: {$exists: false}}).sort('name');
			}			 
			res.status(200).json(result);
		} catch (err) {
			return next(err);
		}
	},

	async getAllBooksOfUser(req, res, next) {
		try {
			const result = await Book.find({isTakenByUser: {$eq: req.params.id}}).sort('name');
			res.status(200).json(result);
		} catch (err) {
			return next(err);
		}
	},

	async getBook(req, res, next) {
		try {
			const result = await Book.findOne({
				_id: req.params.id
			});
			if(!result) {
				res.status(404).json(NO_BOOKS_FOUND_FOR_ID);
			} else {
				res.status(200).json(result);
			}
		} catch (err) {
			return next(err);
		}
	},

	async updateBook(req, res, next) {
		try {
			const userId = req.body.userId; //should I get it from session l8r?
			let updateBookOptions;

			if(userId) {					//if userID was provided, we book the book for this user
				updateBookOptions = {
					isTakenByUser: userId
				};
			} else {						//else it means that user wants to release the book, 
				updateBookOptions = {		//so we remove the corresponding field value
					$unset: {isTakenByUser: ''}
				};
			}

			const result = await Book.findByIdAndUpdate(
				req.params.id, 
				updateBookOptions, 
				{
					new: true,
					returnNewDocument: true,
				});
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).json(NO_BOOKS_FOUND_FOR_ID);
			}
		} catch (err) {
			return next(err);
		}
	},

	async deleteBook(req, res, next) {
		try {
			const result = await Book.deleteOne({
				_id: req.params.id
			});
			if(result.deletedCount == 0){
				res.status(404).json(NO_BOOKS_FOUND_FOR_ID);
			} else {
				res.status(200).json();
			}
		} catch (err) {
			return next(err);
		}
	}

};
