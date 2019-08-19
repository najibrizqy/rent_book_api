const modelGenre = require('../models/mdgenre')

module.exports = {
  getAll: (req, res) => {
    const queryParams = {
      sort: req.query.sort,
      type: req.query.type
    }
    modelGenre.getAll(queryParams)
      .then(result => res.json({status: 200, values : result}))
      .catch(err => {
        if(err.errno == 1064){
          res.json({msg : "Type Sort must be ASC or DESC."})
        }else if(err.errno == 1054){
          res.json({msg : "Sort not valid."})
        }
        console.log(err)
      })
  },
  insertGenre: (req, res) => {
    const data = {
      name: req.body.name
    }

    modelGenre.insertGenre(data)
      .then(result => res.json(result))
      .catch(err => {
        console.log(err)
        if(err.errno == 1048)
          res.json((400),{msg : "There are fields that have not been filled."})
      })
  },
  updateGenre: (req, res) => {
    const data = {
      name: req.body.name
    }

    const id = {
      id_genre: req.params.id
    }

    modelGenre.updateGenre(data, id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  deleteGenre: (req, res) => {
    const id = {
      id_genre: req.params.id
    }
    modelGenre.deleteGenre(id)
      .then(result => {
        if(result.affectedRows == 0){
          res.json((404),{status : 404, msg : "Id not Found."})
        }else
        res.json({status : 200, msg: "The book has been deleted."})
      })
      .catch(err => console.log(err))
  }
}
