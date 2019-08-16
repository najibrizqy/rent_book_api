const conn = require('../config/db')

module.exports = {
  getAll: (query) => {
    return new Promise((resolve, reject) => {
      const sorting = query.sort
      if (query.sort != undefined) {
        conn.query(`SELECT * FROM genre ORDER BY name ${sorting}`, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      } else {
        conn.query(`SELECT * FROM genre`, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      }
    })
  },
  insertGenre: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT genre SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  updateGenre: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE genre SET ? WHERE ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteGenre: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM genre WHERE ?', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

}
