const customError = require("../common/customError");
const { Customer } = require("../../models");
module.exports = {
  async getCustomers(req, res) {
    try {
      let result = await Customer.getCustomers();
      res.send(result);
    } catch (err) {
      customError.mapDomainErrorToHttpResponse(res, err);
    }
  },
  async getCustomerById(req, res) {
    try {
      const { customerId } = req.params;
      let result = await Customer.getCustomerById(customerId);
      if (result == null) {
        throw new customError.NotFoundError({ message: "Customer not found" });
      }
      res.send(result);
    } catch (err) {
      customError.mapDomainErrorToHttpResponse(res, err);
    }
  },
  async add(req, res) {
    try {
      let payload = req.body;
      let result = await Customer.add(payload);
      res.send(result);
    } catch (err) {
      customError.mapDomainErrorToHttpResponse(res, err);
    }
  },
  async update(req, res) {
    try {
      const { customerId } = req.params;
      let payload = req.body;
      let result = await Customer.put(payload, customerId);
      if (result > 0) {
        res.send({ message: "Update successfully" });
      } else {
        throw new customError.NotFoundError({ message: "Customer not found" });
      }
    } catch (err) {
      customError.mapDomainErrorToHttpResponse(res, err);
    }
  },
  async delete(req, res) {
    try {
      const { customerId } = req.params;
      let result = await Customer.delete(customerId);
      if (result > 0) {
        res.send({ message: "Delete successfully" });
      } else {
        throw new customError.NotFoundError({ message: "Customer not found" });
      }
    } catch (err) {
      customError.mapDomainErrorToHttpResponse(res, err);
    }
  }
};
