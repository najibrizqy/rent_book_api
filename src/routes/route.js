const express = require('express')
const Route = express.Router()

const BooksController = require('../controllers/Books')
const GenreController = require('../controllers/Genre')
const RentController = require('../controllers/Rent_book')
const UsersController = require('../controllers/Users')
const StatusController = require('../controllers/Status')

Route
// Route Book
  .get('/books', BooksController.getAll)
  .get('/books/year/', BooksController.getBookYears)
  .get('/books/year/:year', BooksController.getBookByYear)
  .get('/books/genre/:genre', BooksController.getBookByGenre)
  .get('/books/:id', BooksController.detailBook)
  .post('/books', UsersController.Auth, UsersController.verifyAdmin, BooksController.insertBook)
  .patch('/books/:id', UsersController.Auth, UsersController.verifyAdmin, BooksController.updateBook)
  .delete('/books/:id',  UsersController.Auth, UsersController.verifyAdmin, BooksController.deleteBook)

// Route Genre
  .get('/genre', GenreController.getAll)
  .post('/genre', UsersController.Auth, UsersController.verifyAdmin, GenreController.insertGenre)
  .patch('/genre/:id', UsersController.Auth, UsersController.verifyAdmin, GenreController.updateGenre)
  .delete('/genre/:id', UsersController.Auth, UsersController.verifyAdmin, GenreController.deleteGenre)

// Route Rent_Book
  .get('/rent_book', UsersController.Auth, RentController.getAll)
  .get('/rent_book/borrowed/:id', UsersController.Auth, RentController.getBorrowedBook)
  .get('/rent_book/history/:id', UsersController.Auth, RentController.getHistory)
  .post('/rent_book', UsersController.Auth, RentController.rentBook)
  .patch('/rent_book/:id', UsersController.Auth, UsersController.verifyAdmin, RentController.returnBook)
  .delete('/rent_book/:id', UsersController.Auth, UsersController.verifyAdmin, RentController.deleteData)

// Route User
  .get('/users', UsersController.Auth, UsersController.verifyAdmin, UsersController.getAll)
  .get('/users/profile', UsersController.Auth, UsersController.getProfile)
  .get('/users/:id', UsersController.Auth, UsersController.getUserById)
  .post('/users/login', UsersController.login)
  .post('/users/register', UsersController.register)
  .delete('/users/:id', UsersController.Auth, UsersController.verifyAdmin, UsersController.deleteUsers)

// Route Status
  .get('/status', StatusController.getAll)

module.exports = Route
