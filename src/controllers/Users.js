require('dotenv').config()

// import package
const modelUsers = require('../models/mdusers')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const joi = require('joi')

// this is function to validate form
validateForm = (data) => {
  const schema = joi.object().keys({
    email: joi.string().email({ minDomainSegments: 2 }),
    password: joi.string().min(6).required()
  })
  const result = joi.validate(data, schema)
  if (result.error == null) {
    return true
  } else {
    return false
  }
}

// this is function to encrypt password
encrypt = (key) => {
  const password = crypto.createHash('SHA1').update(key).digest('hex')
  return password
},

module.exports = {
  getAll: (req, res) => {
    const query = {
      sort: req.query.sort
    }
    modelUsers.getAll(query)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  register: (req, res) => {
    const hashPassword = encrypt(req.body.password)
    const data = {
      email: req.body.email,
      password: hashPassword
    }

    if (!validateForm(data)) {
      res.json({ msg: 'email or password not valid' })
    }

    modelUsers.register(data)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  login: (req, res) => {
    const hashPassword = encrypt(req.body.password)
    const data = {
      email: req.body.email,
      password: hashPassword
    }

    if (!validateForm(data)) {
      res.json({ msg: 'email or password not valid' })
    }

    modelUsers.login(data)
      .then(result => {
        const getPassword = result[0].password // get password from db
        const user = {
          id: result[0].id_user,
          email: result[0].email
        }

        if (data.password == getPassword) {
          jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
            if (!err) {
              res.json({ token })
            } else {
              console.log(err)
            }
          })
        } else {
          const errMessage = {
            errMessage: 'Your Email or Password Incorrect.'
          }
          res.json(errMessage)
        }
      })
      .catch(err => res.json(err))
  },
  updateUsers: (req, res) => {
    const data = {
      username: req.body.username,
      password: req.body.password
    }

    const id = {
      id_user: req.params.id_user
    }

    modelUsers.updateUsers(data, id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  deleteUsers: (req, res) => {
    const id = {
      id_user: req.params.id_user
    }
    modelUsers.deleteUsers(id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  // Midleware to check user token
  Auth: (req, res, next) => {
    try {
      const header = req.headers['authorization']
      const bearer = header.split(' ')
      const token = bearer[1]
      jwt.verify(token, process.env.SECRET_KEY, (err, AuthData) => {
        if (err) {
          res.json({ msg: 'Invalid Token!' })
          res.sendStatus(403)
        } else {
          req.id_user = AuthData.user.id
          req.email = AuthData.user.email
          next()
        }
      })
    } catch (err) {
      res.sendStatus(403)
    }
  }
}
