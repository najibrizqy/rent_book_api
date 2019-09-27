const express = require('express')
const Route = express.Router()

const {
    getAll,
    getProfile,
    getUserById,
    login,
    register,
    deleteUsers
} = require('../controllers/Users')
const {authLogin, verifyAdmin} = require('../middleware/Auth')

Route
    .get('/', authLogin, verifyAdmin, getAll)
    .get('/profile', authLogin, getProfile)
    .get('/:id', authLogin, getUserById)
    .post('/login', login)
    .post('/register', register)
    .delete('/:id', authLogin, verifyAdmin, deleteUsers)

module.exports = Route