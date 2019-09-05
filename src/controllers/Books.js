const modelBooks = require('../models/mdbooks')
const multer = require('../middleware/multer')
const cloudinary = require('../config/cloudinaryConfig')

module.exports = {
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
  detailBook: (req, res) => {
    const id = {
      id_book: req.params.id
    }
    modelBooks.detailBook(id)
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
      .catch(err => console.log(err))
  },
  getBooksDonate: (req, res) => {
    modelBooks.getBooksDonate()
    .then(response => {
      if(response.length > 0){
        const msg = {
          status: 200,
          values: response
        }
        res.json(msg)
      }else{
        res.json((404),{status: 404, msg : "empty."})
      }
    })
    .catch(err => console.log(err))
  },
  getBooksOrder: (req, res) => {
    modelBooks.getBooksOrder()
      .then(response => {
        if(response.length > 0){
          const msg = {
            status: 200,
            values: response
          }
          res.json(msg)
        }else{
          res.json((404),{status: 404, msg : "empty."})
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
          res.json({status: 404, msg : "Data not found."})
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
          res.json({status: 404, msg : "Data not found."})
        }
      })
      .catch(err => {
        console.error(err)
      })
  },
  insertBook: (req, res) => {
    const imageData = {
      image: req.file
    }

    if(imageData.image) {
      const file = multer.dataUri(req).content
      cloudinary.uploader.upload(file)

      .then((result) => {
        const data = {
          title: req.body.title,
          description: req.body.description,
          image: result.url,
          date_released: req.body.date_released,
          id_genre: req.body.id_genre,
          id_status: req.id_status,
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
      })
      .catch((err) => res.status(400).json({
          message: 'someting went wrong while processing your request',
          data: {
              err
          }
      }))
    }
  },
  updateBook: (req, res) => {
    const imageData = {
      image: req.file
    }

    if(imageData.image) {
      const file = multer.dataUri(req).content
      cloudinary.uploader.upload(file)

      .then((result) => {
        const data = {
          title: req.body.title,
          description: req.body.description,
          image: result.url,
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
      })
      .catch((err) => res.status(400).json({
          message: 'someting went wrong while processing your request',
          data: {
              err
          }
      }))
    }else{
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
    }
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
  },
  setStatus: (req, res) => {
    const data = {
      id_book: req.params.id
    }
    modelBooks.setStatus(data.id_book, 2)
      .then(result => {
        if(result.affectedRows == 0)
          res.json((404),{status : 404, msg : "Id not Found."})
        else
          res.json({status : 200, msg: "The book has been confirm."})
      })
      .catch(err => console.log(err))
  }
}
