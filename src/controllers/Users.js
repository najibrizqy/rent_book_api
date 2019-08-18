require('dotenv').config()

// import package
const modelUsers = require('../models/mdusers')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const joi = require('joi')

// this is function to validate form
validateForm = (data) => {
  const schema = joi.object().keys({
    email: joi.string().email({ minDomainAtoms: 2 }),
    password: joi.string().min(6).required(),
<<<<<<< HEAD
    created_at: joi.date(),
    updated_at: joi.date()
=======
    created_at: joi.date()
>>>>>>> 79dae49c14a8791ba66a6c2eba9b12b4d5ce2333
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
      password: hashPassword,
<<<<<<< HEAD
      created_at: new Date(),
      updated_at: new Date()
=======
      created_at: new Date()
>>>>>>> 79dae49c14a8791ba66a6c2eba9b12b4d5ce2333
    }

    if (!validateForm(data)) {
      return res.json({ msg: 'email or password not valid' })
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
      return res.json({ msg: 'email or password not valid' })
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
  deleteUsers: (req, res) => {
    const id = {
      id_user: req.params.id
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
          res.json((403), { msg: 'Invalid Token!' })
        } else {
          req.id_user = AuthData.user.id
          req.email = AuthData.user.email
          next()
        }
      })
    } catch (err) {
<<<<<<< HEAD
      res.json((403), { msg: 'Login first' })
=======
      res.json((403), {msg: "Login first"})
>>>>>>> 79dae49c14a8791ba66a6c2eba9b12b4d5ce2333
    }
  }
}
