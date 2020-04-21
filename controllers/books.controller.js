import {Book} from '../models/book.model.js';

export const BooksController = {
    async test(req, res) {
        res.send('Greetings from the Test controller!');
    },

    async getAllBooks(req, res) {
        try {
			const result = await Book.find().sort('name');
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}

    },

    async updateBook(req, res) {
        try {
			const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
				taken: req.params.userId
			});
			res.status(200).send(book);
		} catch (error) {
			res.status(400).send(error);
		}

    },

    async deleteBook(req, res) {
        try{
			const book = await Book.deleteOne({ _id: req.params.id });
			res.status(200).send(book);//do I need to return the deleted obj??
        } catch (error) {
			res.status(400).send(error);
		}
    }

};
