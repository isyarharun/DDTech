const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/index");
const migrations = require("./migrations");
const { sequelize } = require("./models");
const app = express();
app.use(bodyParser.json());

require("./api/routes")(app);
app.use(function(err, req, res, next) {
  console.error({
    url: req.url,
    params: req.params,
    body: req.body
  });
  res.send({ error: err.message });
});

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync().then(() => {
      // start express
      app.listen(config.port);
      console.log(`Server started on port ${config.port}`);
    });
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
