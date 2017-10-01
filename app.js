const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
var dateFormat = require('dateformat');
// var Sequelize = require('sequelize'),
//   sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/gabble')
appRouter = require('./routes.js')(express);
flash = require('express-flash');
const app = express();
setupPP = require('./setupPP');
//---------------------------------------------------------------

var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    is_eq: function(a, b) {
      if (a == b) {
        return true
      } else {
        return false
      }
    },
    form_dt: function(a) {
      return dateFormat(a, "mmm dd, yyyy h:MM TT");
    },
    likes_fm: function(a) {
      if (a > 0) {
        return a;
      } else {
        return "No Likes Yet";
      }
    }
  }
});

app.engine('handlebars', hbs.engine);
//app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(expressValidator());
setupPP(app);

app.use(flash());
app.use(session({
  secret: "gabbleGabble",
  resave: false,
  saveUninitialized: true
}));
app.use('/', appRouter);
// app.get('/', (req,res) =>{
//   res.render("signup");
// })
// app.get('/signup', (req,res) =>{
//   res.render("signup");
// })

app.listen(3000);
module.exports.getApp = app


//module.exports = sequelize
