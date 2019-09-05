const conn = require('../config/db')
let bookListQuery = `SELECT id_book, title, description, image, date_released, addBy, books.id_genre, genre.name AS genre,status.id_status, status.availability AS availability FROM books JOIN genre ON books.id_genre = genre.id_genre JOIN status on books.id_status = status.id_status WHERE `
module.exports = {
  getAll: (queryParams) => {
    return new Promise((resolve, reject) => {
      const sortBy = queryParams.sort || 'id_book'
      const typeSort = queryParams.type || 'asc'
      const searching = queryParams.search
      const paging = parseInt(queryParams.page) || 1
      const limitation = queryParams.limit || 10
      const startLimit = (paging > 1) ? (paging * limitation) - limitation : 0
      const availability = queryParams.availability
      let totalData = 0
      let totalPage = 0

      // this is query for count total book
      let query = `SELECT COUNT(id_book) AS total FROM books WHERE `

      const searchingIsDefined = queryParams.search != undefined
      const availableIsDefined = queryParams.availability != undefined

      if (searchingIsDefined || availableIsDefined) {
        query += searchingIsDefined ? `title LIKE '%${searching}%' ` : ``
        query += searchingIsDefined && availableIsDefined ? `AND ` : ``
        query += availableIsDefined ? `id_status = '${availability}' ` : `AND id_status != 3`
      }else{
        query += `id_status != 3`
      }

      conn.query(query, (err, rows) => {
        if (!err) {
          totalData = rows[0].total
          totalPage = Math.ceil(totalData / limitation)
        } else {
          reject(err)
        }

        // this is query for combine search, sort|typesort, page|limit, and availability
        let query = bookListQuery;

        if (searchingIsDefined || availableIsDefined) {
          query += searchingIsDefined ? `title LIKE '%${searching}%' ` : ``
          query += searchingIsDefined && availableIsDefined ? `AND ` : ``
          query += availableIsDefined ? `books.id_status = '${availability}' ` : `AND books.id_status != 3 `
        }else{
          query += `books.id_status != 3 `
        }
        
        query += `ORDER BY ${sortBy} ${typeSort} `

        conn.query(query + `LIMIT ${limitation} OFFSET ${startLimit}`, (err, result) => {
          if (!err) {
            if (result.length > 0) {
              const response = {
                totalData: totalData,
                page: paging,
                totalPage: totalPage,
                limit: parseInt(limitation),
                values: result
              }
              resolve(response)
            } else {
              const msg = {
                status : 404,
                msg: 'Data not found'
              }
              console.log(err)
              resolve(msg)
            }
          } else {
            reject(err)
          }
        })
      })
    })
  },
  detailBook: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(`${bookListQuery} ?`, [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getBooksDonate: () => {
    return new Promise((resolve, reject) => {
      conn.query(`${bookListQuery}books.id_status = 3`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
            reject(err) 
        }
      })
    })
  },
  getBooksOrder: () => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT id, transaction.id_book, books.title, books.image, users.id_user, users.username, users.full_name FROM transaction JOIN books ON transaction.id_book = books.id_book JOIN users ON transaction.id_user = users.id_user WHERE isConfirm = 0`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
            reject(err) 
        }
      })
    })
  },
  getBookYears: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT YEAR(date_released) AS year FROM books GROUP BY year ORDER BY year DESC', (err, result) => {
        if (!err) {
          const msg = {
            status : 200,
            values : result
          }
          resolve(msg)
        } else {
            reject(err) 
        }
      })
    })
  },
  getBookByYear: (year) => {
    return new Promise((resolve, reject) => {
      conn.query(`${bookListQuery} YEAR(date_released) = ${year}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err) 
        }
      })
    })
  },
  getBookByGenre: (genre) => {
    return new Promise((resolve, reject) => {
      conn.query(`${bookListQuery} genre.name = ?`, genre, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err) 
        }
      })
    })
  },
  insertBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT books SET ?', data, (err, result) => {
        if (!err) {
          const msg = {
            status : 200,
            values : data,
            msg : `The ${data.title} book was successfully added to the database`
          }
          resolve(msg)
        } else {
          reject(err)
        }
      })
    })
  },
  updateBook: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE books SET ? WHERE ?', [data, id], (err, result, msg) => {
        if (!err) {
          if (result.affectedRows == 0){
            msg = {
              status: 404,
              msg : "Id not found."
            }
          } else{
            msg = {
              status : 200,
              msg : `The ${data.title} book was successfully updated`
            }
          }
          resolve(msg)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteBook: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM books WHERE ?', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  setStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE books SET id_status =? WHERE id_book =?', [status, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }  
}
