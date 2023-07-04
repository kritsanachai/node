module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      employee_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
    });
  
    return Employee;
  };