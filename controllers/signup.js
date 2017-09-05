
var bcrypt = require('bcrypt'),
    Model = require('../models/models.js')

module.exports.show = function(req, res) {
  res.render('signup')
}

module.exports.signup = function(req, res) {
  var username = req.body.username
  var password = req.body.password
  var password2 = req.body.password2

  if (!username || !password || !password2) {
    req.flash('error', "Please, fill in all the fields.")
    console.log('here 1');

    res.redirect('signup')

  }

  if (password !== password2) {
    req.flash('error', "Please, enter the same password twice.")
    console.log('here 2');

    res.redirect('signup')
  }

  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)
  console.log('here 3');

  var newUser = {
    username: username,
    salt: salt,
    password: hashedPassword
  }

  Model.User.create(newUser).then(function() {
    console.log("here 4")
    res.redirect('/')
  }).catch(function(error) {
    console.log("errror " + error);
    req.flash('error', "Please, choose a different username.")
    res.redirect('/')
  })
}
