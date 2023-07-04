const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;

exports.getAll = ((req, res)=>{
    // res.json({message: "Hello from customer"})
    Customer.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving custpmers."
      });
    });
})

exports.getById = ((req, res)=>{
    // let id = req.params.id
    // res.json({message: "Hello from customer" + id})
    const id = req.params.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Customer.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving customers."
        });
        });
})

exports.getByName = ((req, res)=>{
    // let name = req.params.name
    // res.json({message: "Hello from customer" + name})
    const name = req.params.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Customer.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving customers."
        });
        });
})

exports.create = ((req, res)=>{
    // res.send("Create customer")
    if (!req.body.customer_id) {
        res.status(400).send({
          message: "Customer id can not be empty!"
        });
        return;
      }
      const customer = {
        customer_id: req.body.customer_id,
        name: req.body.name,
        tel: req.body.tel,
    
      };
    //   console.log(employee);
      Customer.create(customer)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the customer."
          });
        });  
})

exports.update = ((req, res)=>{
    // let id = req.params.id
    // res.send("Update customer " + id)
    const id = req.params.id;

    Customer.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Customer was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Customer with id=${id}. Maybe Tutorial was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Customer with id=" + id
        });
        });
})

exports.delete = ((req, res)=>{
    // let id = req.params.id
    // res.send("Delete customer " + id)
    const id = req.params.id;

    Customer.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                message: "Customer was deleted successfully!"
                });
            } else {
                res.send({
                message: `Cannot delete Customer with id=${id}. Maybe Tutorial was not found!`
                });
            }
            })
            .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
})