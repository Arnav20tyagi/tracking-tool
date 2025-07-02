const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Make sure this is here

const connectDB = async () => {
  try {
    MONGO_URI="mongodb+srv://admin:mysecretpassword123@cluster0.pspdkfz.mongodb.net/"

    const conn = await mongoose.connect("mongodb+srv://admin:mysecretpassword123@cluster0.pspdkfz.mongodb.net/"); // MONGO_URI from .env
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
