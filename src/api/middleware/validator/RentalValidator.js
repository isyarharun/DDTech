const BaseJoi = require("@hapi/joi");
const Extension = require("@hapi/joi-date");
const Joi = BaseJoi.extend(Extension);
module.exports = {
  addValidator(req, res, next) {
    const schema = {
      carIds: Joi.array()
        .min(1)
        .required(),
      startDate: Joi.date()
        .format("YYYY-MM-DD HH:mm:ss")
        .required(),
      endDate: Joi.date()
        .format("YYYY-MM-DD HH:mm:ss")
        .min(Joi.ref("startDate"))
        .required(),
      customerId: Joi.number()
        .integer()
        .min(1)
        .positive()
        .required()
    };
    let validate = Joi.validate(req.body, schema);
    if (validate.error == null) {
      next();
    } else {
      res.status(400).send({ error: validate.error.details[0].message });
    }
  }
};
