const express = require('express')
const Route = express.Router()

const {
    getAll,
    getBooksDonate,
    getBooksOrder,
    getBookYears,
    getBookByYear,
    getBookByGenre,
    detailBook,
    insertBook,
    setStatus,
    updateBook,
    deleteBook
} = require('../controllers/Books')
const {authLogin, verifyAdmin} = require('../middleware/Auth')
const {multerUploads} = require('../middleware/Multer')

Route
    .get('/', getAll)
    .get('/donate/', authLogin, verifyAdmin, getBooksDonate)
    .get('/order/', authLogin, verifyAdmin, getBooksOrder)
    .get('/year/', getBookYears)
    .get('/year/:year', getBookByYear)
    .get('/genre/:genre', getBookByGenre)
    .get('/:id', detailBook)
    .post('', authLogin, Auth.addBook, multerUploads, insertBook)
    .patch('/confirm/:id', authLogin, verifyAdmin, setStatus)
    .patch('/:id', authLogin, verifyAdmin, multerUploads, updateBook)
    .delete('/:id',  authLogin, verifyAdmin, deleteBook)

module.exports = Route