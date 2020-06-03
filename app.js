import express from 'express';
import bodyParser from 'body-parser';

import {booksRouter} from './routes/books.route.js'; // Imports routes for the books
import {usersRouter} from './routes/users.route.js'; 

import databaseConnect from './database.js';
import passport from './middleware/passport.js';
import startServer from './server.js';
import corsSetup from './middleware/cors.js';


// initialize our express app
const app = express();

databaseConnect();

corsSetup(app);
app.use(passport.initialize()); 


app.use('/books', booksRouter);
app.use('/user', usersRouter);
startServer(app);

export default app;