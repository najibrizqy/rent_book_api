const conn = require('../config/db')

module.exports = {
  getAll: (queryParams) => {
    return new Promise((resolve, reject) => {
      const sortBy = queryParams.sort || 'id_genre'
      const typeSort = queryParams.type || 'asc'
      if (queryParams.sort != undefined) {
        conn.query(`SELECT * FROM genre ORDER BY ${sortBy} ${typeSort}`, (err, result) => {
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
