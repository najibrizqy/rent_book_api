const express = require('express')
const Route = express.Router()

const BooksController = require('../controllers/Books')
const GenreController = require('../controllers/Genre')
const RentController = require('../controllers/Rent_book')
const UsersController = require('../controllers/Users')

Route
// Route Book
  .get('/books', BooksController.getAll)
  .get('/books/:id', BooksController.detailBook)
  .post('/books', BooksController.insertBook)
  .patch('/books/:id', BooksController.updateBook)
  .delete('/books/:id', BooksController.deleteBook)

// Route Genre
  .get('/genre', GenreController.getAll)
  .post('/genre', GenreController.insertGenre)
  .patch('/genre/:id', GenreController.updateGenre)
  .delete('/genre/:id', GenreController.deleteGenre)

// Route Rent_Book
  .get('/rent_book', RentController.getAll)
  .post('/rent_book', UsersController.Auth, RentController.rentBook)
  .patch('/rent_book/:id', UsersController.Auth, RentController.returnBook)
  .delete('/rent_book/:id', RentController.deleteData)

// Route User
  .get('/users', UsersController.getAll)
  .post('/users/login', UsersController.login)
  .post('/users/register', UsersController.register)
  .delete('/users/:id', UsersController.deleteUsers)

module.exports = Route
