const conn = require('../config/db')

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM transaction', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  rentBook: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM books WHERE ?', [id], (err, result) => {
        const errorId = {
          errorId: 'id book not found.'
        }
        const msg = {
          msg: 'Book is not available.'
        }
        if (result.length == 0) {
          reject(errorId)
        } else {
          const getStatus = result[0].id_status
          if (!err && getStatus == 1) {
            conn.query('INSERT INTO transaction SET ?', data, (err, result) => {
              if (!err) {
                resolve(result)
              } else {
                reject(err)
              }
            })
          } else {
            reject(msg)
          }
        }
      })
    })
  },
  returnBook: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE transaction SET ? WHERE ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM transaction WHERE ?', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

}
