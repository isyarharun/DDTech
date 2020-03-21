const customError = require("../common/customError");
const { Car } = require("../../models");
module.exports = {
  async getCars(req, res) {
    try {
      let result = await Car.getCars();
      res.send(result);
    } catch (err) {
      customError.mapDomainErrorToHttpResponse(res, err);
    }
  },
  async getCarById(req, res) {
    try {
      const { carId } = req.params;
      let result = await Car.getCarById(carId);
      if (result == null) {
        throw new customError.NotFoundError({ message: "Car not found" });
      }
      res.send(result);
    } catch (err) {
      customError.mapDomainErrorToHttpResponse(res, err);
    }
  },
  async add(req, res) {
    try {
      let payload = req.body;
      let result = await Car.add(payload);
      res.send(result);
    } catch (err) {
      customError.mapDomainErrorToHttpResponse(res, err);
    }
  },
  async update(req, res) {
    try {
      const { carId } = req.params;
      let payload = req.body;
      let result = await Car.put(payload, carId);
      if (result > 0) {
        res.send({ message: "Update successfully" });
      } else {
        throw new customError.NotFoundError({ message: "Car not found" });
      }
    } catch (err) {
      customError.mapDomainErrorToHttpResponse(res, err);
    }
  },
  async delete(req, res) {
    try {
      const { carId } = req.params;
      let result = await Car.delete(carId);
      if (result > 0) {
        res.send({ message: "Delete successfully" });
      } else {
        throw new customError.NotFoundError({ message: "Car not found" });
      }
    } catch (err) {
      customError.mapDomainErrorToHttpResponse(res, err);
    }
  }
};
