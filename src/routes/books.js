const express = require('express')
const Route = express.Router()

const BooksController = require('../controllers/Books')
const Auth = require('../middleware/Auth')
const Multer = require('../middleware/Multer')

Route
    .get('/', BooksController.getAll)
    .get('/donate/', Auth.authLogin, Auth.verifyAdmin, BooksController.getBooksDonate)
    .get('/order/', Auth.authLogin, Auth.verifyAdmin, BooksController.getBooksOrder)
    .get('/year/', BooksController.getBookYears)
    .get('/year/:year', BooksController.getBookByYear)
    .get('/genre/:genre', BooksController.getBookByGenre)
    .get('/:id', BooksController.detailBook)
    .post('', Auth.authLogin, Auth.addBook, Multer.multerUploads, BooksController.insertBook)
    .patch('/confirm/:id', Auth.authLogin, Auth.verifyAdmin, BooksController.setStatus)
    .patch('/:id', Auth.authLogin, Auth.verifyAdmin, Multer.multerUploads, BooksController.updateBook)
    .delete('/:id',  Auth.authLogin, Auth.verifyAdmin, BooksController.deleteBook)

module.exports = Route