var Umzug = require("umzug");
const { sequelize } = require("../models");
var umzug = new Umzug({
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
    tableName: "_migration"
  },
  migrations: {
    params: [
      sequelize.getQueryInterface(), // queryInterface
      sequelize.constructor, // DataTypes
      function() {
        throw new Error(
          'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
        );
      }
    ],
    path: "./src/migrations",
    pattern: /^.*\.js$/
  }
});

umzug.up().then(
  console.log('success'),
)

module.exports = {
  umzug
};
