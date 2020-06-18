import {Book} from '../models/book.model.js';

const NO_BOOKS_FOUND_FOR_ID = 'No books found for given ID';

export const BooksController = {

	async getAllBooks(req, res, next) {
		try {
			const result = await Book.find().sort('name');
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

		const book = await Book.findByIdAndUpdate(
			req.params.id, {
				isTakenByUser: req.query.userId
			}, {
				new: true,
				returnNewDocument: true,
			},
			function (err, result) {
				if (err) {
					next(err);
				} else if (result) {
					res.status(200).json(result);
				} else {
					res.status(404).json(NO_BOOKS_FOUND_FOR_ID);
				}
			});
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
