var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
var ConnectDB = require('../public/assets/backend/DBConnection.js');
var DBModels = require('../models/DBModels.js');

await ConnectDB() // in order to not run APIs before to be connected to DB

async function GetUsersFromDb(usersIDs) { 
  var tempUsers = []  
  
  for await (const userID of usersIDs) {
    // Load the user from DB
    var user = await DBModels.User.findById(userID)

    // Create a new temp user just with the info I need and add it to the array
    var userToInsert = {
      name: user.name,
      surname: user.surname
    }
    tempUsers.push(userToInsert)
  }
  return tempUsers
}

async function GetProductsFromDb(rows) {   
  var tempRows = []

  for await (const row of rows) {
    // Load the product from db
    var prod = await DBModels.Product.findById(row.productID)

    var newRow = {
      productName: prod.name,
      productPrice: prod.price,
      quantity: row.quantity,
      totalPrice: row.quantity * prod.price
    }
    tempRows.push(newRow)
  }
  return tempRows     
} 

var jsonParser = bodyparser.json()

module.exports = function (app) {

  app.get("/orders", urlencodedParser, function (req, res) {

    var filterDate = req.query.date
    var filterProduct = req.query.product
    var filter = {}

    if (filterDate != "") {
      var today = new Date(filterDate);
      var tomorrow = new Date(filterDate)        
      tomorrow.setDate(tomorrow.getDate() + 1)
    }

    if (!filterDate == "" || !filterProduct == "") {
      if (!filterDate == "" && !filterProduct == "") {
        //If both filters applied
        filter = {date: {$gte: today, $lt: tomorrow}, rows : {$elemMatch : {
          productName: filterProduct
        }}}
      }
      else if (!filterDate == "" && filterProduct == "") {
        //Just date    
        filter = {date: {$gte: today, $lt: tomorrow}}
      }
      else {
        //Just product
        filter = {rows : {$elemMatch : {
          productName: filterProduct
        }}}
      }
    }

    const data = DBModels.Order.find(filter)
      .then(function(data) {
        res.render("orders", {orders: data});
    })
    .catch(function (err) {
        throw err;
    })  
     
  });

  app.get("/orders/create", async function (req, res) {
    var usersData = await DBModels.User.find({})
    var productsData = await DBModels.Product.find({})

    data = {
      users: usersData,
      products: productsData
    }
      res.render("orderCreation", {data: data});    
  })

  app.get("/orders/edit/:id", async function (req, res) {
    var orderData = await DBModels.Order.findById(req.params.id)
    var usersData = await DBModels.User.find({})
    var productsData = await DBModels.Product.find({})

    data = {
      order: orderData,
      users: usersData,
      products: productsData
    }
      res.render("orderUpdate", {data: data});    
  })

  app.post("/orders", jsonParser, async function (req, res) {
    // Get data from the view and add it to mongoDB     
    
    const users = await GetUsersFromDb(req.body.usersIDs)
    const rows = await GetProductsFromDb(req.body.rows)

    var orderToCreate = {
      date: req.body.date,
      users: users,
      rows: rows
    }
  
    var newOrder = DBModels.Order(orderToCreate)
      .save()
      .then(function (data) {
        res.redirect("/orders");
      })
      .catch(function (err) {
        throw err;
      });
  });  

  app.get("/orders/:id", function (req, res) {
    const id = req.params.id;

    var order = DBModels.Order.findById(id)

    .then(function(data) {      
      res.render("orderDetails", {order: data});
    })
    .catch(function (err) {
        throw err;
    })   
  })

  app.put("/orders/:id", jsonParser, async function (req, res) {

    const users = await GetUsersFromDb(req.body.usersIDs)
    const rows = await GetProductsFromDb(req.body.rows)

    // Update data from mongoDB
    DBModels.Order.updateOne(
      { _id: req.params.id },
      { users: users, rows: rows }
    )
      .then(function (data) {
        res.redirect("/orders/:id");
      })
      .catch(function (err) {
        throw err;
      }); 
  })

  app.delete("/orders/:id", function (req, res) {
    // Delete data from mongoDB
    const id = req.params.id;
    DBModels.Order.findOneAndDelete(id)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        throw err;
      });
  });

};
