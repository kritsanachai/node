const express = require('express');
const app = express.Router()
const employeeController = require("../controllers/employee.controller")

app.get("/", employeeController.getAll)

app.get("/:id", employeeController.getById)

app.get("/name/:id", employeeController.getByName)

app.post("/", employeeController.create)

app.put("/:id", employeeController.update)

app.delete("/:id", employeeController.delete)

module.exports = app