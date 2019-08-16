const express = require('express')
const Route = express.Router()

const BooksController = require('../controllers/Books')
const GenreController = require('../controllers/Genre')
const RentController = require('../controllers/Rent_book')
const UsersController = require('../controllers/Users')

Route
// Route Book
  .get('/books', BooksController.getAll)
  .post('/books', BooksController.insertBook)
  .patch('/books/:id_book', BooksController.updateBook)
  .delete('/books/:id_book', BooksController.deleteBook)

// Route Genre
  .get('/genre', GenreController.getAll)
  .post('/genre', GenreController.insertGenre)
  .patch('/genre/:id_genre', GenreController.updateGenre)
  .delete('/genre/:id_genre', GenreController.deleteGenre)

// Route Rent_Book
  .get('/rent_book', RentController.getAll)
  .post('/rent_book', UsersController.Auth, RentController.rentBook)
  .patch('/rent_book/:id', RentController.returnBook)
  .delete('/rent_book/:id', RentController.deleteData)

// Route User
  .get('/users', UsersController.getAll)
  .post('/users/login', UsersController.login)
  .post('/users/register', UsersController.register)
  .patch('/users/:id_user', UsersController.updateUsers)
  .delete('/users/:id_user', UsersController.deleteUsers)

module.exports = Route
