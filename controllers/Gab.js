var Model = require('../models/models.js')

module.exports.show = function(req, res) {
  res.render('creategabble')
}

module.exports.create = function(req, res) {
  var username = req.session.uname

  if (!username) {
    req.flash('error', "You Must Be Signed in to Gab")
    res.redirect('login')
  }
  var newGab = {
    username: username,
    gab: req.body.gabble,
    createdat: new Date()

  }
  Model.Gabs.create(newGab).then(function() {
    console.log("created gab")
    res.redirect('/')
  }).catch(function(error) {
    console.log("errror " + error);
    req.flash('error', "Something went wrong.")
    res.redirect('/')
  })
}
