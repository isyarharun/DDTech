const Joi = require("@hapi/joi");
module.exports = {
  addValidator(req, res, next) {
    const schema = {
      builtYear: Joi.number()
        .min(1000)
        .max(9999)
        .required(),
      vehicleNumber: Joi.any().required(),
      rentPrice: Joi.number()
        .positive()
        .required(),
      brand: Joi.any().optional(),
      available: Joi.boolean().optional(),
      capacity: Joi.number()
        .integer()
        .min(1)
        .positive()
        .optional()
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
      builtYear: Joi.number()
        .min(1000)
        .max(9999)
        .optional(),
      vehicleNumber: Joi.any().optional(),
      rentPrice: Joi.number()
        .positive()
        .optional(),
      brand: Joi.any().optional(),
      available: Joi.boolean().optional(),
      capacity: Joi.number()
        .integer()
        .min(1)
        .positive()
        .optional()
    };
    let validate = Joi.validate(req.body, schema);
    if (validate.error == null) {
      next();
    } else {
      res.status(400).send({ error: validate.error.details[0].message });
    }
  }
};
