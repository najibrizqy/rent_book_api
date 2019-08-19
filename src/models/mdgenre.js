const conn = require('../config/db')

module.exports = {
  getAll: (queryParams) => {
    return new Promise((resolve, reject) => {
      const sortBy = queryParams.sort || 'id_genre'
      const typeSort = queryParams.type || 'asc'
      conn.query(`SELECT * FROM genre ORDER BY ${sortBy} ${typeSort}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
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
      conn.query('UPDATE genre SET ? WHERE ?', [data, id], (err, result, msg) => {
        if (!err) {
          if (result.affectedRows == 0){
            msg = {
              status: 404,
              msg : "Id not found."
            }
          } else{
            msg = {
              status : 200,
              msg : `genre was successfully updated`
            }
          }
          resolve(msg)
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
