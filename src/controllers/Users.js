require('dotenv').config()

// import package
const modelUsers = require('../models/mdusers')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const joi = require('@hapi/joi')

// this is function to validate form
validateForm = (data) => {
  const schema = joi.object().keys({
    username: joi.string().min(3).max(12).required(),
    full_name: joi.string().min(6).max(20).required(),
    email: joi.string().email({ minDomainSegments: 2 }),
    password: joi.string().min(6).required(),
    level: joi.string(),
    created_at: joi.date(),
    updated_at: joi.date()
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
  getUserById: (req, res) => {
    const id = {
      id_user: req.params.id
    }
    modelUsers.getUserById(id)
      .then(result => {
        const msg = {
          status: 200,
          values: result
        }
        res.json(msg)
      })
      .catch(err => console.log(err))
  },
  getProfile: (req, res) =>{
    const userProfile = {
      id: req.id_user,
      username: req.username,
      fullname: req.full_name,
      email: req.email,
      level: req.level
    }
    return res.json(userProfile)
  },
  register: (req, res) => {
    const hashPassword = encrypt(req.body.password)
    const data = {
      username: req.body.username,
      full_name: req.body.full_name,
      email: req.body.email,
      password: hashPassword,
      level: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }

    if (!validateForm(data)) {
      return res.json(404, {status: 404, errMsg: 'data not valid' })
    }

    modelUsers.getEmail(data.email)
      .then(result => {
        if(result.length === 0){
          return modelUsers.register(data)
        }else{
          const msg ={
            status : 409,
            errMsg : "Email is already in use."
          }
          res.json(409, msg)
        }
      })
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  login: (req, res) => {
    const hashPassword = encrypt(req.body.password)
    const data = {
      email: req.body.email,
      password: hashPassword
    }

    modelUsers.login(data)
      .then(result => {
        const getPassword = result[0].password // get password from db
        const user = {
          id: result[0].id_user,
          username: result[0].username,
          full_name: result[0].full_name,
          email: result[0].email,
          level: result[0].level
        }

        if (data.password == getPassword) {
          jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
            if (!err) {
              res.json({token: `Bearer ${token}`})
            } else {
              console.log(err)
            }
          })
        } else {
          const errMessage = {
            status: 404,
            errMsg: 'Your Email or Password Incorrect.'
          }
          res.json(404, errMessage)
        }
      })
      .catch(err => res.json(404, err))
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
          req.username = AuthData.user.username
          req.full_name = AuthData.user.full_name
          req.email = AuthData.user.email
          req.level = AuthData.user.level
          next()
        }
      })
    } catch (err) {
      res.json((403), { msg: 'Login first' })
    }
  },
  verifyAdmin: (req, res, next) => {
    if (req.level === 'admin') { next() } else { res.sendStatus(403) }
  }
}
