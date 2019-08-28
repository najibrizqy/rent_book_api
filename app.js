require('dotenv').config()

const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const Route = require('./src/routes/route')

const port = process.env.SERVER_PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`)
})

app.use(cors())

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', Route)
