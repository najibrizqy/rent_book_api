const modelRent = require('../models/mdrentbook')

module.exports = {
  getAll: (req, res) => {
    modelRent.getAll()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  rentBook: (req, res) => {
    const data = {
      id_user: req.id_user,
      id_book: req.body.id_book,
      rent_at: new Date()
    }
    const id = {
      id_book: req.body.id_book
    }

    modelRent.rentBook(data, id)
      .then(result => res.json(result))
      .catch(err => res.json(err))
  },
  returnBook: (req, res) => {
    const data = {
      id_book: req.body.id_book,
      return_at: new Date()
    }

    const id = {
      id: req.params.id
    }

    modelRent.returnBook(data, id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  deleteData: (req, res) => {
    const id = {
      id: req.params.id
    }
    modelRent.deleteData(id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  }
}
