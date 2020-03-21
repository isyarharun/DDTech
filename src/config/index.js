const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.APIPORT,
  environment: process.env.ENVIRONMENT,
  testHost: process.env.TESTHOST,
  db: {
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    options: {
      dialect: 'mysql',
      dialectOptions: {
        multipleStatements: true
      },
      host: process.env.DBHOST,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  }
  // put other setting in here, it clean using this way rather than using process.env in code
};
