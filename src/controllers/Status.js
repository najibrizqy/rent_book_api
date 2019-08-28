const modelStatus = require('../models/mdstatus')

module.exports = {
  getAll: (req, res) => {
    modelStatus.getAll()
      .then(result => res.json({status: 200, values : result}))
      .catch(err => {console.log(err)
      })
  }
}
