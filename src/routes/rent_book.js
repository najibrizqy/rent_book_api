const express = require('express')
const Route = express.Router()

const RentController = require('../controllers/Rent_book')
const Auth = require('../middleware/Auth')

Route
    .get('/', Auth.authLogin, RentController.getAll)
    .get('/borrowed/:id', Auth.authLogin, RentController.getBorrowedBook)
    .get('/history/:id', Auth.authLogin, RentController.getHistory)
    .post('/', Auth.authLogin, RentController.rentBook)
    .patch('/:id', Auth.authLogin, Auth.verifyAdmin, RentController.returnBook)
    .delete('/:id', Auth.authLogin, Auth.verifyAdmin, RentController.deleteData)

module.exports = Route