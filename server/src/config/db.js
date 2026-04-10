const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  console.log("MONGO_URI:", mongoUri); // 👈 ADD THIS LINE

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  await mongoose.connect(mongoUri);
  console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
};

module.exports = connectDB;