import express from 'express';
import bodyParser from 'body-parser';

import {booksRouter} from './routes/books.route.js'; // Imports routes for the books
import {usersRouter} from './routes/users.route.js'; 

import databaseConnect from './database.js';
import passport from './authentication/passport.js';



// initialize our express app
const app = express();

databaseConnect();


// Set up mongoose connection


app.use(passport.initialize()); 


app.use('/books', booksRouter);
app.use('/user', usersRouter);

export default app;