var passport = require('passport'),
    signupController = require('./controllers/signup.js')
    loginController = require('./controllers/login.js')
    User = require('./models/User.js')




    module.exports = function(express) {
      var router = express.Router()

      var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated())
          return next()
        req.flash('error', 'You have to be logged in to access the page.')
        res.redirect('/')
      }

      router.get('/signup', signupController.show)
      router.post('/signup', signupController.signup)


      //router.post('/login', passport.authenticate('local'), function(req, res) {
      //    console.log( "logged in: " + req.user.username)
      //    req.session.uname = req.user.username;
      //    res.redirect('/');
      //});
      router.get('/failedlogin', function(req, res){
        req.flash('info', 'Hi there!');
        res.locals.message = "bbb";// req.flash('Login Failed');
        console.log("failed login");
        res.redirect('/login');
      });
      router.post('/login', passport.authenticate('local',
          {
              failureRedirect:'/login',
              failureFlash:true
          }), function(req, res) {
            req.session.uname = req.user.username;
            res.redirect('/');
      });
      router.get('/login', loginController.show)
      router.get('/', function(req, res) {
        // if (typeof req.isAuthenticated !== 'undefined')
        // {
        //   if( req.isAuthenticated){
        //     console.log("authenticated")
        //     if( typeof req.user !== 'undefined'){
        //       console.log(req.user.username)
        //       res.render('index', { username: req.user })
        //     }else{
        //       res.render('index')
        //     }
        //   }
        // }
        res.render('index',{ username: req.session.uname })
      })

      router.get('/dashboard', isAuthenticated, function(req, res) {
        res.render('dashboard')
      })

      router.get('/logout', function(req, res) {
        req.logout()
        req.session.uname = null;
        res.redirect('/')
      })

      return router
    }
