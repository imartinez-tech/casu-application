const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
  sequelize = new Sequelize('mysql://b99b66a567cdaa:67906a71@us-cdbr-east-04.cleardb.com/heroku_053dc4caf001f3d?reconnect=true');
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'us-cdbr-east-04.cleardb.com',
      dialect: 'mysql',
      port: 3306
    }
  );
  sequelize = new Sequelize('mysql://b99b66a567cdaa:67906a71@us-cdbr-east-04.cleardb.com/heroku_053dc4caf001f3d?reconnect=true');
}

module.exports = sequelize