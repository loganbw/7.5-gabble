var Sequelize = require('sequelize'),
    config = {
    "define": {
        "createdAt": "createdat",
        "updatedAt": "updatedat"
      } /*don't forget to add host, port, dialect, etc.*/
    }


sequelize = new Sequelize('postgresql://localHost:5432/gabble', config)

module.exports = sequelize
