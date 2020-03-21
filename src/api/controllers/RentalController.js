const customError = require("../common/customError");
const { Rental, Car, Customer } = require("../../models");
const moment = require("moment");
module.exports = {
  async makeRental(req, res) {
    try {
      const { carIds, customerId, startDate, endDate } = req.body;
      let dayDiff = moment(endDate).diff(moment(startDate), "days");
      let carsToRent = await Car.getCarsAvailableByIds(carIds);
      let customerWhoRent = await Customer.getCustomerById(customerId);
      if (customerWhoRent != null && carsToRent.length > 0) {
        for (let i = 0; i < carsToRent.length; i++) {
          let carToRent = carsToRent[i];
          let discount = Rental.rentCalculator(
            carToRent.rentPrice,
            dayDiff,
            carsToRent.length,
            carToRent.builtYear
          );
          let payload = {
            carId: carToRent.id,
            customerId: customerWhoRent.id,
            startDate,
            endDate,
            originalPrice: carToRent.rentPrice,
            discountPrice: discount
          };
          await Rental.add(payload);
          await Car.put({ available: false }, carToRent.id);
        }
        let rentalDetail = await Rental.getRentalDetail(
          customerWhoRent.id,
          startDate,
          endDate
        );
        res.send(rentalDetail);
      } else {
        throw new customError.NotFoundError({ message: "Car not found" });
      }
    } catch (err) {
      customError.mapDomainErrorToHttpResponse(res, err);
    }
  }
};
