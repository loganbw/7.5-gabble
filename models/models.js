var UserMeta = require('./User.js'),
  connection = require('../sequelize.js')
var GabMeta = require('./Gabble.js')
var LikesMeta = require('./Likes.js')

var User = connection.define('users', UserMeta.attributes, UserMeta.options)
var Gabs = connection.define('gabs', GabMeta.attributes, GabMeta.options)
var Likes = connection.define('likes', LikesMeta.attributes, LikesMeta.options)

module.exports.User = User
module.exports.Gabs = Gabs
module.exports.Likes = Likes
