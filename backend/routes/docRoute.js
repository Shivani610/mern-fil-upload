const { addDocController, getAllMultiDoc } = require("../controller/docController")

const router = require("express").Router()
router.post("/add", addDocController)
    .get("/", getAllMultiDoc)
module.exports = router