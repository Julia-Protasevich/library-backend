const express = require('express');
const bodyParser = require('body-parser');

const book = require('./routes/books.route'); // Imports routes for the books

// initialize our express app
const app = express();

app.use('/books', book);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
