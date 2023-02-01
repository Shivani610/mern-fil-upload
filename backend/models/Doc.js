const mongoose = require("mongoose")
module.exports = mongoose.model("multidoc", mongoose.Schema({
    userDob: String,
    userAdhar: String,
    userTc: String
}, { timestamps: true }))