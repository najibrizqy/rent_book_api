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
      available: req.query.available
    }
    modelBooks.getAll(queryParams)
      .then(response => res.json(response))
      .catch(err => console.log(err))
  },
  // get detail book
  detailBook: (req, res) => {
    const id = {
      id_book: req.params.id
    }
    modelBooks.detailBook(id)
      .then(response => res.json(response))
      .catch(err => console.log(err))
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
      .then(result => res.json(result))
      .catch(err => console.log(err))
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
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  deleteBook: (req, res) => {
    const id = {
      id_book: req.params.id
    }
    modelBooks.deleteBook(id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  }
}
