const CarController = require("./controllers/CarController");
const CustomerController = require("./controllers/CustomerController");
const RentalController = require("./controllers/RentalController");

const CarValidator = require("./middleware/validator/CarValidator");
const CustomerValidator = require("./middleware/validator/CustomerValidator");
const RentalValidator = require("./middleware/validator/RentalValidator");

module.exports = app => {
  app.post("/car", CarValidator.addValidator, CarController.add);
  app.put("/car/:carId", CarValidator.updateValidator, CarController.update);
  app.delete("/car/:carId", CarController.delete);
  app.get("/car/:carId", CarController.getCarById);
  app.get("/cars", CarController.getCars);

  app.post("/customer", CustomerValidator.addValidator, CustomerController.add);
  app.put(
    "/customer/:customerId",
    CustomerValidator.updateValidator,
    CustomerController.update
  );
  app.delete("/customer/:customerId", CustomerController.delete);
  app.get("/customer/:customerId", CustomerController.getCustomerById);
  app.get("/customers", CustomerController.getCustomers);

  app.post(
    "/rental/makeRental",
    RentalValidator.addValidator,
    RentalController.makeRental
  );
};
