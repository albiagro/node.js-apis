//Connect to db
var mongoose = require('mongoose');
require('dotenv').config()

module.exports = async function ConnectDB() {try {
  await mongoose.connect(process.env.MONGO_URI)
} catch (error) {
  console.log(error);
}}