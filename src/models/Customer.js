module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50)
  });

  Customer.getCustomers = async function() {
    return await Customer.findAndCountAll();
  };

  Customer.getCustomerById = async function(customerId) {
    return await Customer.findByPk(customerId);
  };

  Customer.add = async function(payload) {
    return await Customer.create(payload);
  };

  Customer.delete = async function(customerId) {
    return await Customer.destroy({
      where: {
        id: customerId
      }
    });
  };

  Customer.put = async function(updates, customerId) {
    return await Customer.update(updates, {
      where: {
        id: customerId
      }
    });
  };

  return Customer;
};
