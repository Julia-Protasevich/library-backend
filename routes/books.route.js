const express = require('express');
const router = express.Router();

const books_controller = require('../controllers/books.controller');


router.get('/test', books_controller.test);

module.exports = router;
