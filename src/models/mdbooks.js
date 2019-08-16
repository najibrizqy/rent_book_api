const conn = require('../config/db')
module.exports = {
  getAll: (queryString) => {
    return new Promise((resolve, reject) => {
      const sortBy = queryString.sort_by || 'id_book'
      const typeSort = queryString.type_sort || 'asc'
      const searching = queryString.search || ''
      const paging = parseInt(queryString.page) || 1
      const limitation = queryString.limit || 2
      const startLimit = (paging > 1) ? (paging * limitation) - limitation : 0
      const availability = queryString.available
      let totalData = 0
      let totalPage = 0

      // this is query for count total book
      let query = `SELECT COUNT(id_book) AS total FROM books `

      const searchingIsDefined = queryString.search != undefined
      const availableIsDefined = queryString.available != undefined
      const sortIsDefined = queryString.sort_by != undefined
      const typeSortIsDefined = queryString.type_sort != undefined

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
        let query = `SELECT * FROM books `

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
                values: result,
                totalData: totalData,
                page: paging,
                totalPage: totalPage,
                limit: limitation
              }
              resolve(response)
            } else {
              const msg = {
                msg: 'Data not found'
              }
              resolve(msg)
            }
          } else {
            reject(err)
          }
        })
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
