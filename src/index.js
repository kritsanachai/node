require("dotenv").config({ path: "./config.env"})
const express = require("express");
const bodyParser = require("body-parser")
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const productRoute = require('./routes/product.route')
const employeeRoute = require('./routes/employee.route')
const customerRoute = require('./routes/customer.route')
const app = express()
const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };
  
  app.use(cors(corsOptions));
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) =>{
    res.json({message: "Hello from root."})
})


app.use('/product',productRoute)
app.use('/employee',employeeRoute)
app.use('/customer',customerRoute)

app.listen(PORT, () =>{
    console.log("App is running on port " + PORT);
})