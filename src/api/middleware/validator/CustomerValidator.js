const Joi = require("@hapi/joi");
module.exports = {
  addValidator(req, res, next) {
    const schema = {
      firstName: Joi.any().required(),
      lastName: Joi.any().optional()
    };
    let validate = Joi.validate(req.body, schema);
    if (validate.error == null) {
      next();
    } else {
      res.status(400).send({ error: validate.error.details[0].message });
    }
  },
  updateValidator(req, res, next) {
    const schema = {
      firstName: Joi.any().optional(),
      lastName: Joi.any().optional()
    };
    let validate = Joi.validate(req.body, schema);
    if (validate.error == null) {
      next();
    } else {
      res.status(400).send({ error: validate.error.details[0].message });
    }
  }
};
