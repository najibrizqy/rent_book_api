const express = require('express');

const books = require('./books');
const genres = require('./genres');
const rent_book = require('./rent_book');
const users = require('./users');
const status = require('./status');

const Route = express.Router();

Route.use('/books', books);
Route.use('/genre', genres);
Route.use('/rent_book', rent_book);
Route.use('/users', users);
Route.use('/status', status);

module.exports = Route;