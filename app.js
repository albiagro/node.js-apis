var express = require('express');
var productsController = require('./controllers/productsController');
var usersController = require('./controllers/usersController');
const ordersController = require('./controllers/ordersController');

var app = express();

//template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('index')
})

//fire controller
productsController(app);
usersController(app);
ordersController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000.');