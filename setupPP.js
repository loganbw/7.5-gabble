var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt'),
  Model = require('./models/models.js')

module.exports = function(app) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    function(username, password, done) {
      Model.User.findOne({
        where: {
          'username': username
        }
      }).then(function(user) {
        if (user == null) {
          return done(null, false, {
            message: 'Incorrect credentials.'
          })
        }

        var hashedPassword = bcrypt.hashSync(password, user.salt)

        if (user.password === hashedPassword) {
          console.log("test");
          return done(null, user)
        }

        return done(null, false, {
          message: 'Incorrect credentials.'
        })
      })
    }
  ))

  passport.serializeUser(function(user, done) {
    console.log("test");

    done(null, user.username)
  })

  passport.deserializeUser(function(id, done) {
    Model.User.findOne({
      where: {
        'id': id
      }
    }).then(function(user) {
      if (user == null) {
        done(new Error('Wrong user id.'))
      } else {
        console.log("user deserialized")
        done(null, user)
      }
    })
  })
}
