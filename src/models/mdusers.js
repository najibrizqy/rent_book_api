const conn = require('../config/db')
const crypto = require('crypto')

module.exports = {
  getAll: (query) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM users', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  register: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM users WHERE email =?', [data.email], (err, result) => {
        if (result.length > 0) {
          const msg = {
            msg: 'Email is already in use'
          } 
          resolve(msg)
        } else {
          conn.query('INSERT INTO users SET ?', data, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              reject(err)
            }
          })
        }
      })
    })
  },
  login: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM users WHERE email =?', [data.email], (err, result) => {
        if (!err && result.length > 0) {
          resolve(result)
        } else {
          err = {
            err: 'Your Email or Password Incorrect.'
          }
          reject(err)
        }
      })
    })
  },
  deleteUsers: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM users WHERE ?', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

}
