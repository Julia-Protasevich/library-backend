import express from 'express';
import {BooksController} from'../controllers/books.controller.js';

export const booksRouter = express.Router();

booksRouter.route('/test').get(BooksController.test);

