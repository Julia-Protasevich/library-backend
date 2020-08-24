import express from 'express';
import {BooksController} from'../controllers/books.controller.js';

export const booksRouter = express.Router();

booksRouter.route('/')
    .get(BooksController.getAllBooks);
booksRouter.route('/:id')
    .get(BooksController.getBook)
    .put(BooksController.updateBook)
    .delete(BooksController.deleteBook);
booksRouter.route('/userid/:id')
    .get(BooksController.getAllBooksOfUser);
