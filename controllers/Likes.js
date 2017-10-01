var Model = require('../models/models.js')

module.exports.getLikes = function(req, res) {

  Model.Likes.findAll().then(function(likes) {
    console.log("got likes");
    // projects will be an array of all Project instances
  })
}
module.exports.create = function(req, res) {
  var username = req.session.uname

  if (!username) {
    req.flash('error', "You Must Be Signed in to Like")
    res.redirect('login')
  }
  Model.Likes.findAndCountAll({
    where: {
      likeusername: username,
      gabid: req.body.gabid
    }
  }).then(result => {

    if (result.count == 0) {
      //alter gabs table value for likecount
      Model.Gabs.increment('likecount', {
        where: {
          id: req.body.gabid
        }
      });

      var newLike = {
        likeusername: username,
        gabid: req.body.gabid
      }
      Model.Likes.create(newLike).then(function() {
        console.log("added like")
        res.redirect('/')
      }).catch(function(error) {
        console.log("errror " + error);
        req.flash('error', "Something went wrong.")
        res.redirect('/')
      })
    } else {
      console.log("You Already Liked This Post")
      req.flash('info', "You already liked This Post.")
      res.redirect('/')
    }
  });
}
