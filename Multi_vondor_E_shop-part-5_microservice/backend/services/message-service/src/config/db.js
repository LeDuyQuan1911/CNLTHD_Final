const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://leduyquan2574:Quan19112003@quan.bqfgfhl.mongodb.net/ConservationMicroservice?retryWrites=true&w=majority" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;