const express = require('express')
const Route = express.Router()

const UsersController = require('../controllers/Users')
const Auth = require('../middleware/Auth')

Route
    .get('/', Auth.authLogin, Auth.verifyAdmin, UsersController.getAll)
    .get('/profile', Auth.authLogin, UsersController.getProfile)
    .get('/:id', Auth.authLogin, UsersController.getUserById)
    .post('/login', UsersController.login)
    .post('/register', UsersController.register)
    .delete('/:id', Auth.authLogin, Auth.verifyAdmin, UsersController.deleteUsers)

module.exports = Route