const modelBooks = require('../models/mdbooks')

module.exports = {
  // get all data books
  getAll: (req, res) => {
    const queryParams = {
      search: req.query.search,
      sort: req.query.sort,
      type: req.query.type,
      page: req.query.page,
      limit: req.query.limit,
      availability: req.query.availability
    }
    modelBooks.getAll(queryParams)
      .then(response => res.json(response))
      .catch(err => {
        if(err.errno == 1064){
          res.json({msg : "Type Sort must be ASC or DESC."})
        }else if(err.errno == 1054){
          res.json({msg : "Sort not valid."})
        }
        console.log(err)
      })
  },
  // get detail book
  detailBook: (req, res) => {
    const id = {
      id_book: req.params.id
    }
    modelBooks.detailBook(id)
      .then(response => {
        if(response.length > 0){
          res.json(response)
        }else{
          res.json((404),{status: 404, msg : "Data not found."})
        }
      })
      .catch(err => console.log(err))
  },
  getBookYears: (req, res) => {
    modelBooks.getBookYears()
      .then(msg => {
        res.json(msg)
      })
      .catch(err => {
        console.error(err)
      })
  },
  getBookByYear: (req, res) => {
    modelBooks.getBookByYear(req.params.year)
      .then(response => {
        if(response.length > 0){
          const msg = {
            status: 200,
            values: response
          }
          res.json(msg)
        }else{
          res.json((404),{status: 404, msg : "Data not found."})
        }
      })
      .catch(err => {
        console.error(err)
      })
  },
  getBookByGenre: (req, res) => {
    modelBooks.getBookByGenre(req.params.genre)
      .then(response => {
        if(response.length > 0){
          const msg = {
            status: 200,
            values: response
          }
          res.json(msg)
        }else{
          res.json((404),{status: 404, msg : "Data not found."})
        }
      })
      .catch(err => {
        console.error(err)
      })
  },
  insertBook: (req, res) => {
    const data = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date_released: req.body.date_released,
      id_genre: req.body.id_genre,
      id_status: 1,
      created_at: new Date(),
      updated_at: new Date()
    }

    modelBooks.insertBook(data)
      .then(msg => res.json(msg))
      .catch(err => {
        console.log(err)
        if(err.errno == 1048)
          res.json((400),{msg : "There are fields that have not been filled."})
      })
  },
  updateBook: (req, res) => {
    const data = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date_released: req.body.date_released,
      id_genre: req.body.id_genre,
      id_status: req.body.id_status,
      updated_at: new Date()
    }

    const id = {
      id_book: req.params.id
    }

    modelBooks.updateBook(data, id)
      .then(msg => res.json(msg))
      .catch(err => console.log(err))
  },
  deleteBook: (req, res) => {
    const id = {
      id_book: req.params.id
    }
    modelBooks.deleteBook(id)
      .then(result => {
        if(result.affectedRows == 0){
          res.json((404),{status : 404, msg : "Id not Found."})
        }else
        res.json({status : 200, msg: "The book has been deleted."})
      })
      .catch(err => console.log(err))
  }
}
