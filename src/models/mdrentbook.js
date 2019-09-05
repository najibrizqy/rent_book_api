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
  getOneTransaction: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM transaction WHERE id =?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getHistory: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT transaction.id_book, transaction.rent_at, transaction.return_at, books.title, books.id_status FROM transaction JOIN books ON books.id_book = transaction.id_book WHERE ? ORDER BY return_at', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getBorrowedBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM transaction WHERE id_book =? AND return_at IS ?', [data.id_book, data.return_at], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  requestBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM books WHERE id_book =?', data.id_book, (err, result) => {
        console.log(result)
        if (result.length == 0) {
          const msg = {
            errMsg: 'Book not found.'
          }
          reject(msg)
        }else{
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
            const msg = {
              errMsg: 'Book is not available.'
            }
            reject(msg)
          }
        }
      })
    })
  },
  rentBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM users WHERE id_user =?', data.id_user, (err, result) => {
        const msg = {
          errMsg: 'User not found.'
        }
        if (result.length == 0) {
          reject(msg)
        } else {
          conn.query('SELECT * FROM books WHERE id_book =?', data.id_book, (err, result) => {
            console.log(result)
            if (result.length == 0) {
              const msg = {
                errMsg: 'Book not found.'
              }
              reject(msg)
            }else{
              const getStatus = result[0].id_status
              if (!err && getStatus == 1 || getStatus == 4) {
                conn.query('INSERT INTO transaction SET ?', data, (err, result) => {
                  if (!err) {
                    resolve(result)
                  } else {
                    reject(err)
                  }
                })
              } else {
                const msg = {
                  errMsg: 'Book is not available.'
                }
                reject(msg)
              }
            }
          })
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
