var mongoose = require('mongoose');

//User schema and model
var userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String
});

var User = mongoose.model('User', userSchema)

//Product schema and model
var productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
  });
  
var Product = mongoose.model('Product', productsSchema);

//Order schema and model
var orderSchema = new mongoose.Schema({
    date: Date,
    users: Array,
    rows: Array
});
var Order = mongoose.model('Order', orderSchema)

module.exports = {Order, User, Product}
