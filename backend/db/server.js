const mongoose = require("mongoose");
require('dotenv').config()
const uri = process.env.DB_URI;

const main = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // You should consider handling the error in a better way
  }
};

main().catch(err => console.error(err));

module.exports = main;
