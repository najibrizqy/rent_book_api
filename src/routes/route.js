const express = require('express')
const Route = express.Router()

const BooksController = require('../controllers/Books')
const GenreController = require('../controllers/Genre')
const RentController = require('../controllers/Rent_book')
const UsersController = require('../controllers/Users')

Route
// Route Book
  .get('/books', BooksController.getAll)
<<<<<<< HEAD
  .get('/books/:id', BooksController.detailBook)
=======
  .get('/books/:id_book', BooksController.detailBook)
>>>>>>> 79dae49c14a8791ba66a6c2eba9b12b4d5ce2333
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
<<<<<<< HEAD
  .delete('/users/:id', UsersController.deleteUsers)
=======
  .delete('/users/:id_user', UsersController.deleteUsers)
>>>>>>> 79dae49c14a8791ba66a6c2eba9b12b4d5ce2333

module.exports = Route
