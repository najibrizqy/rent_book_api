const express = require('express')
const Route = express.Router()

const GenreController = require('../controllers/Genre')
const Auth = require('../middleware/Auth')

Route
    .get('/', GenreController.getAll)
    .post('/', Auth.authLogin, Auth.verifyAdmin, GenreController.insertGenre)
    .patch('/:id', Auth.authLogin, Auth.verifyAdmin, GenreController.updateGenre)
    .delete('/:id', Auth.authLogin, Auth.verifyAdmin, GenreController.deleteGenre)

module.exports = Route