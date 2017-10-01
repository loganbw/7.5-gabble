var Sequelize = require('sequelize')

var attributes = {
  id:{
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    // validate: {
    //   is: /^[a-z0-9\_\-]+$/i,
    // }
  },
  gab: {
    type: Sequelize.STRING,
  },
  likecount:{
      type: Sequelize.INTEGER,
      defaultValue: 0,
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
