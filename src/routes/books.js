const express = require('express')
const Route = express.Router()

const BooksController = require('../controllers/Books')
const Auth = require('../middleware/Auth')
const Multer = require('../middleware/Multer')

Route
    .get('/', BooksController.getAll)
    .get('/year/', BooksController.getBookYears)
    .get('/year/:year', BooksController.getBookByYear)
    .get('/genre/:genre', BooksController.getBookByGenre)
    .get('/:id', BooksController.detailBook)
    .post('', Auth.authLogin, Auth.verifyAdmin, Multer.multerUploads, BooksController.insertBook)
    .patch('/:id', Auth.authLogin, Auth.verifyAdmin, Multer.multerUploads, BooksController.updateBook)
    .delete('/:id',  Auth.authLogin, Auth.verifyAdmin, BooksController.deleteBook)

module.exports = Route