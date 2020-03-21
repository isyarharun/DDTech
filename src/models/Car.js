module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define("Car", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    vehicleNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    builtYear: DataTypes.INTEGER(4),
    brand: DataTypes.STRING(50),
    available: DataTypes.BOOLEAN,
    capacity: DataTypes.INTEGER(1),
    rentPrice: DataTypes.DOUBLE
  });

  Car.getCars = async function() {
    return await Car.findAndCountAll();
  };

  Car.getCarById = async function(carId) {
    return await Car.findByPk(carId);
  };

  Car.getCarsAvailableByIds = async function(carIds) {
    if (Array.isArray(carIds)) {
      let query = `
      SELECT
        * 
      FROM
        cars 
      WHERE
        id IN ( ? ) 
        AND available
      `;
      let result = await sequelize.query(query, {
        replacements: [carIds],
        type: sequelize.QueryTypes.SELECT
      });
      return result;
    }
    return null;
  };

  Car.add = async function(payload) {
    return await Car.create(payload);
  };

  Car.delete = async function(carId) {
    return await Car.destroy({
      where: {
        id: carId
      }
    });
  };

  Car.put = async function(updates, carId) {
    return await Car.update(updates, {
      where: {
        id: carId
      }
    });
  };

  return Car;
};
