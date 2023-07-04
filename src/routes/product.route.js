const express = require('express');
const app = express.Router()
const productController = require("../controllers/product.controller")


app.get("/", productController.getAll)
  
app.get("/:id", productController.getById)
  
app.get("/name/:name", productController.getByName)

app.post("/", productController.create)

app.put("/:id", productController.update)

app.delete("/:id", productController.delete)

module.exports = app