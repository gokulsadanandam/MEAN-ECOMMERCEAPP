var mongoose = require('mongoose')

var order = new mongoose.Schema({
    "loyaltytracker": String,
    "order": Object
})


module.exports = mongoose.model("orders", order)