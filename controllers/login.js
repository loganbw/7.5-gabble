var bcrypt = require('bcrypt'),
    Model = require('../models/models.js')

module.exports.show = function(req, res) {
  res.render('login')
}
