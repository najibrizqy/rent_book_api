const modelRent = require('../models/mdrentbook')

module.exports = {
  getAll: (req, res) => {
    modelRent.getAll()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  getAll: (req, res) => {
    modelRent.getAll()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  getBorrowedBook:(req, res) => {
    const data = {
      id_book: req.params.id,
      return_at: null
    }
    modelRent.getBorrowedBook(data)
      .then(result => {
        const msg ={
          status: 200,
          values: result
        }
        res.json(msg) 
      })
      .catch(err => console.log(err))
  },
  rentBook: (req, res) => {
    const data = {
      id_user: req.body.id_user,
      id_book: req.body.id_book,
      rent_at: new Date()
    }

    modelRent.rentBook(data)
      .then(result => res.json(result))
      .catch(err => res.json(404, err))
  },
  returnBook: (req, res) => {
    const data = {
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
