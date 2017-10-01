var passport = require('passport'),
    signupController = require('./controllers/signup.js'),
    loginController = require('./controllers/login.js'),
    User = require('./models/User.js'),
    gabController = require('./controllers/Gab.js'),
    likeController = require('./controllers/Likes.js'),
    Gabs = require('./models/Gabble.js'),
    Model = require('./models/models.js')
    Likes = require('./models/Likes.js')


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

      router.get('/creategab', gabController.show)
      router.post('/creategab', gabController.create)

      router.post('/likegab', likeController.create)

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
        //var gabs  = gabController.getGabs();
        Model.Gabs.findAll({
          order: [
              ['createdat', 'DESC'],
          ]

        }).then(function(gabbles){
          console.log( "got gabs");
          res.render('index',{ user: req.session.uname, gabs: gabbles })
          // projects will be an array of all Project instances
        })

      })
      router.post('/deletegab', function(req, res) {
        //Model.Gabs.find(req.body.gabid )
        Model.Gabs.destroy({
          where: {
              id: req.body.gabid
          }
        }).then(function(gabbles){

          Model.Likes.destroy({
            where: {
                gabid: req.body.gabid
            }

          }).then( function(){
          console.log( "deleted gab");
          res.redirect('/')
          // projects will be an array of all Project instances
        })})
      })
      router.get('/details', function(req,res) {
      var gabobj = null;

        Model.Gabs.findById(req.query.gabid).then(function(rs){
          gabobj = rs;
          Model.Likes.findAll({
            where: {
              gabid: req.query.gabid
            }
          }).then(function(lks){
            console.log( "got gab" + req.query.gabid + " -- " + gabobj.id);
            console.log( "likes -- " + lks)
            res.render('details',{ user: req.session.uname, gab: gabobj, likes: lks })
          })})
      })
      router.get('/logout', function(req, res) {
        req.logout()
        req.session.uname = null;
        res.redirect('/')
      })

      return router
    }
