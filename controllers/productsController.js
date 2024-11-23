var bodyparser = require("body-parser");
var ConnectDB = require("../public/assets/backend/DBConnection.js");
var DBModels = require('../models/DBModels.js');

await ConnectDB(); // in order to not run APIs before to be connected to DB

var urlencodedParser = bodyparser.urlencoded({ extended: false });
var jsonParser = bodyparser.json();

module.exports = function (app) {
  app.get("/products", function (req, res) {
    // Get data to mongoDB and pass it to view
    var data = DBModels.Product.find({})
      .then(function (data) {
        res.render("products", { products: data });
      })
      .catch(function (err) {
        throw err;
      });
  });

  app.post("/products", urlencodedParser, function (req, res) {
    // Get data from the view and add it to mongoDB
    var newProduct = DBModels.Product(req.body)
      .save()
      .then(function (data) {
        res.redirect("/products");
      })
      .catch(function (err) {
        throw err;
      });
  });

  app.put("/products/:name", jsonParser, function (req, res) {
    // Update data from mongoDB
    DBModels.Product.findOneAndUpdate(
      { name: req.params.name },
      { price: req.body.price }
    )
      .then(function (data) {
        res.redirect("/products");
      })
      .catch(function (err) {
        throw err;
      });
  });

  app.delete("/products/:id", function (req, res) {
    // Delete data from mongoDB
    const id = req.params.id;
    DBModels.Product.findOneAndDelete(id)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        throw err;
      });
  });
};
