module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      customer_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
    });
  
    return Customer;
  };