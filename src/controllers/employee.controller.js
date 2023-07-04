const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;

exports.getAll = ((req, res)=>{
    Employee.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
})

exports.getById = ((req, res)=>{
    // let id = req.params.id
    // res.json({message: "Hello from employee" + id})
    const id = req.params.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Employee.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
        });
})

exports.getByName = ((req, res)=>{
    // let name = req.params.name
    // res.json({message: "Hello from employee" + name})
    const name = req.params.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Employee.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving employees."
        });
        });
  
})

exports.create = ((req, res)=>{
    // res.send("Create employee")
    if (!req.body.employee_id) {
        res.status(400).send({
          message: "Employee id can not be empty!"
        });
        return;
      }
      if (!req.body.name) {
        res.status(400).send({
          message: "Employee name can not be empty!"
        });
        return;
      }
    //   console.log(req.body);
      // Create a Tutorial
      const employee = {
        employee_id: req.body.employee_id,
        name: req.body.name,
        tel: req.body.tel,
    
      };
      // console.log(employee);
      Employee.create(employee)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Employee."
          });
        });
})

exports.update = ((req, res)=>{
    // let id = req.params.id
    // res.send("Update employee " + id)
    const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
})

exports.delete = ((req, res)=>{
    // let id = req.params.id
    // res.send("Delete employee " + id)
    const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
})