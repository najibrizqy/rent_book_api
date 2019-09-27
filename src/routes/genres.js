const express = require('express')
const Route = express.Router()

const {
    getAll,
    insertGenre,
    updateGenre,
    deleteGenre
} = require('../controllers/Genre')
const {authLogin, verifyAdmin} = require('../middleware/Auth')

Route
    .get('/', getAll)
    .post('/', authLogin, verifyAdmin, insertGenre)
    .patch('/:id', authLogin, verifyAdmin, updateGenre)
    .delete('/:id', authLogin, verifyAdmin, deleteGenre)

module.exports = Route