"use strict";
module.exports = {
  up: function(query) {
    let seedQuery = `
      INSERT INTO carrental.cars (vehicleNumber, builtYear, brand, available, capacity, rentPrice) VALUES ('B 12345 KL', 2011, 'Toyota', 1, 5, 150000);
      INSERT INTO carrental.cars (vehicleNumber, builtYear, brand, available, capacity, rentPrice) VALUES ('B 12346 KL', 2012, 'Toyota', 1, 5, 150000);
      INSERT INTO carrental.cars (vehicleNumber, builtYear, brand, available, capacity, rentPrice) VALUES ('B 12355 KL', 2018, 'Toyota', 1, 5, 350000);
      INSERT INTO carrental.customers(firstName, lastName) VALUES ('Isyar', 'Harun');
      `;

    return query.sequelize.query(seedQuery, {
      raw: true
    });
  },

  down: function(query) {
    return query.sequelize.query("");
  }
};
