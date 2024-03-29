const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

exports.getAll = ((req, res)=>{
    // res.json({ message: "Hello from product." })
    Product.findAll()
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

exports.getById = ((req, res)=>{
  const id = req.params.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Product.findAll({ where: condition })
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
  const name = req.params.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Product.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  })

exports.create = ((req, res) =>{
  if (!req.body.name) {
    res.status(400).send({
      message: "Product name can not be empty!"
    });
    return;
  }
  if (!req.body.price) {
    res.status(400).send({
      message: "Product price can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const product = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,

  };

  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
  })

exports.update = ((req, res)=>{
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
  })



exports.delete = ((req, res)=>{
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
  })