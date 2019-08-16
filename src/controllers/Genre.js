const modelGenre = require('../models/mdgenre')

module.exports = {
  getAll: (req, res) => {
    const query = {
      sort: req.query.sort,
      type: req.query.type
    }
    modelGenre.getAll(query)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  insertGenre: (req, res) => {
    const data = {
      name: req.body.name
    }

    modelGenre.insertGenre(data)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  updateGenre: (req, res) => {
    const data = {
      name: req.body.name
    }

    const id = {
      id_genre: req.params.id_genre
    }

    modelGenre.updateGenre(data, id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  deleteGenre: (req, res) => {
    const id = {
      id_genre: req.params.id_genre
    }
    modelGenre.deleteGenre(id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  }
}
