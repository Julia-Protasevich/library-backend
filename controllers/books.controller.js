import {Book} from '../models/book.model.js';

export const BooksController = {
    async test(req, res) {
        res.send('Greetings from the Test controller!');
    }
};
