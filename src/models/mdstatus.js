const conn = require('../config/db')

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM status`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
