const express = require('express')
const app = express.Router()
const customerCotroller = require("../controllers/customer.controller")

app.get("/", customerCotroller.getAll)
  
app.get("/:id", customerCotroller.getById)
  
app.get("/name/:id", customerCotroller.getByName)

app.post("/", customerCotroller.create)

app.put("/:id", customerCotroller.update)

app.delete("/:id", customerCotroller.delete)

module.exports = app
