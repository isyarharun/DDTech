const Sequelize = require("sequelize");
const config = require("../config");
const fs = require('fs')
const path = require('path')

var sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

const db = {
  sequelize
};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.Car.hasMany(db.Rental, { foreignKey: 'carId' });
db.Customer.hasMany(db.Rental, { foreignKey: 'customerId' });

module.exports = db;