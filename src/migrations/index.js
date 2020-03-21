var Umzug = require("umzug");
const { sequelize } = require("../models");
let path = require("path");
var umzug = new Umzug({
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
    tableName: "_migration"
  },
  migrations: {
    params: [sequelize.getQueryInterface()],
    path: path.join(__dirname)
  }
});

(async () => {
  // checks migrations and run them if they are not already applied
  await umzug.up();
  console.log("All migrations performed successfully");
})();

module.exports = {
  umzug
};
