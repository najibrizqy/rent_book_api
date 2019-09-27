const express = require('express')
const Route = express.Router()

const {getAll} = require('../controllers/Status')

Route
    .get('/status', getAll)

module.exports = Route