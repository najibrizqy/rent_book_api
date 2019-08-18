const conn = require('../config/db')
module.exports = {
  getAll: (queryParams) => {
    return new Promise((resolve, reject) => {
      const sortBy = queryParams.sort || 'id_book'
      const typeSort = queryParams.type || 'asc'
      const searching = queryParams.search || ''
      const paging = parseInt(queryParams.page) || 1
      const limitation = queryParams.limit || 5
      const startLimit = (paging > 1) ? (paging * limitation) - limitation : 0
      const availability = queryParams.available
      let totalData = 0
      let totalPage = 0

      // this is query for count total book
      let query = `SELECT COUNT(id_book) AS total FROM books `

      const searchingIsDefined = queryParams.search != undefined
      const availableIsDefined = queryParams.available != undefined
      const sortIsDefined = queryParams.sort != undefined
      const typeSortIsDefined = queryParams.type != undefined

      if (searchingIsDefined || availableIsDefined) {
        query += `WHERE title LIKE '%${searching}%' `
        query += searchingIsDefined && availableIsDefined ? `AND ` : ``
        query += availableIsDefined ? `id_status = ${availability} ` : ``
      }

      conn.query(query, (err, rows) => {
        if (!err) {
          totalData = rows[0].total
          totalPage = Math.ceil(totalData / limitation)
        } else {
          reject(err)
        }

        // this is query for combine search, sort|typesort, page|limit, and availability
<<<<<<< HEAD
        let query = `SELECT books.id_book `
=======
        let query = `SELECT books.id_book, books.title, books.description, books.image, books.date_released, genre.name as genre, books.id_status FROM books INNER JOIN genre ON books.id_genre = genre.id_genre `
>>>>>>> 79dae49c14a8791ba66a6c2eba9b12b4d5ce2333

        if (searchingIsDefined || availableIsDefined) {
          query += `WHERE title LIKE '%${searching}%' `
          query += searchingIsDefined && availableIsDefined ? `AND ` : ``
          query += availableIsDefined ? `id_status = ${availability} ` : ``
        }

        if (sortIsDefined || typeSortIsDefined) {
          query += `ORDER BY ${sortBy} ${typeSort} `
        }

        conn.query(query + `LIMIT ${limitation} OFFSET ${startLimit}`, (err, result) => {
          if (!err) {
            if (result.length > 0) {
              const response = {
                totalData: totalData,
                page: paging,
                totalPage: totalPage,
                limit: limitation,
                values: result
              }
              resolve(response)
            } else {
              const msg = {
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
      conn.query('SELECT * FROM books WHERE ?', [id], (err, result) => {
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
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  updateBook: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE books SET ? WHERE ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
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
  }

}
