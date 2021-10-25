const mongoose = require("mongoose")
require("path")
require("dotenv").config({ path: ".env" })

mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Mongodb Connected")
  })
  .catch((err) => {
    console.log(err)
  })
