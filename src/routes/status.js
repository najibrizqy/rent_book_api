const express = require('express')
const Route = express.Router()

const StatusController = require('../controllers/Status')

Route
    .get('/status', StatusController.getAll)

module.exports = Route