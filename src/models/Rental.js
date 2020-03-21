module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define("Rental", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    carId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    originalPrice: DataTypes.DOUBLE,
    discountPrice: DataTypes.DOUBLE
  });

  Rental.getRentals = async function() {
    return await Rental.findAndCountAll();
  };

  Rental.getRentalById = async function(rentalId) {
    return await Rental.findByPk(rentalId);
  };

  Rental.add = async function(payload) {
    return await Rental.create(payload);
  };

  Rental.delete = async function(rentalId) {
    return await Rental.destroy({
      where: {
        id: rentalId
      }
    });
  };

  Rental.put = async function(updates, rentalId) {
    return await Rental.update(updates, {
      where: {
        id: rentalId
      }
    });
  };

  Rental.getRentalDetail = async function(customerId, startDate, endDate) {
    let query = `
    SELECT
      rentals.startDate,
      rentals.endDate,
      cars.vehicleNumber,
      customers.firstName,
      customers.lastName,
      rentals.originalPrice,
      rentals.discountPrice 
    FROM
      rentals
      INNER JOIN cars ON rentals.carId = cars.id
      INNER JOIN customers ON rentals.customerId = customers.id 
    WHERE
      customerId = ? 
      AND startDate = ? 
      AND endDate = ?
      `;
    let result = await sequelize.query(query, {
      replacements: [customerId, startDate, endDate],
      type: sequelize.QueryTypes.SELECT
    });
    return result;
  };

  Rental.rentCalculator = function(price, rentDay, totalCar, yearBuilt) {
    let threeDaysDiscount = 5 / 100;
    let rentMoreThan1Discount = 10 / 100;
    let carBelow2010Discount = 7 / 100;
    if (rentDay >= 3) {
      price = price - price * threeDaysDiscount;
    }
    if (totalCar > 1) {
      price = price - price * rentMoreThan1Discount;
    }
    if (yearBuilt < 2010) {
      price = price - price * carBelow2010Discount;
    }
    return price;
  };

  return Rental;
};
