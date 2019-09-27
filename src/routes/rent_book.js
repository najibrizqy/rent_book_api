const express = require('express')
const Route = express.Router()

const {
    getAll,
    getBorrowedBook,
    getHistory,
    requestBook,
    rentBook,
    confirmRequest,
    returnBook,
    deleteData
} = require('../controllers/Rent_book')
const {authLogin, verifyAdmin} = require('../middleware/Auth')

Route
    .get('/', authLogin, getAll)
    .get('/borrowed/:id', authLogin, getBorrowedBook)
    .get('/history/:id', authLogin, getHistory)
    .post('/request', authLogin, requestBook)
    .post('/', authLogin, rentBook)
    .patch('/confirm/:id', authLogin, verifyAdmin, confirmRequest)
    .patch('/:id', authLogin, verifyAdmin, returnBook)
    .delete('/:id', authLogin, verifyAdmin, deleteData)

module.exports = Route