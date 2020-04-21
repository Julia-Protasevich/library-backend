import express from 'express';
import {BooksController} from'../controllers/books.controller.js';

export const booksRouter = express.Router();

booksRouter.route('/test')
    .get(BooksController.test);
booksRouter.route('/')
    .get(BooksController.getAllBooks);
booksRouter.route('/:id')
    .put(BooksController.updateBook)
    .delete(BooksController.deleteBook);
