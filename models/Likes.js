var Sequelize = require('sequelize')

var attributes = {
  gabid: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  likeusername: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    // validate: {
    //   is: /^[a-z0-9\_\-]+$/i,
    // }
  },
  createdat: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedat: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  }
}

var options = {
  freezeTableName: true
}

module.exports.attributes = attributes
module.exports.options = options
