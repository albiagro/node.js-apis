var bodyparser = require('body-parser');
var DBModels = require('../models/DBModels.js');

var urlencodedParser = bodyparser.urlencoded({extended: false});
var jsonParser = bodyparser.json()

module.exports = function (app) {

  app.get("/users", function (req, res) {
    // Get data to mongoDB and pass it to view
    var data = DBModels.User.find({})
    .then(function(data) {
        res.render("users", {users: data});
    })
    .catch(function (err) {
        throw err;
    })
     
  });

  app.post("/users", urlencodedParser, function (req, res) {
    // Get data from the view and add it to mongoDB
    var newProduct = DBModels.User(req.body)
      .save()
      .then(function (data) {
        res.redirect('/users')
      })
      .catch(function (err) {
        throw err;
      });
  });

  app.put('/users/:nameAndSurname', jsonParser, function(req, res) {
    // Update data from mongoDB    
    DBModels.User.findOneAndUpdate({name: req.body.name, surname: req.body.surname}, {email: req.body.email})
    .then(function (data) {
      res.redirect('/users')
    })
    .catch(function (err) {
      throw err
    })
        })

  app.delete('/users/:id', function(req, res) {
    // Delete data from mongoDB
    const id = req.params.id;
    DBModels.User.findOneAndDelete(id)
    .then(function (data) {
        res.json(data);
    })
    .catch(function (err) {
        throw err;
    })
  })

};
