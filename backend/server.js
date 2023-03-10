const express = require("express")
const cors = require("cors")
const { connect } = require("./config/db")
require("dotenv").config({ path: ".env" })
connect()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use("/user", require("./routes/userRoutes"))
app.use("/doc", require("./routes/docRoute"))
app.listen(process.env.PORT || 5000, console.log("server running", process.env.PORT))

