const mongoose = require('mongoose');
const connection = async () => {
    try {
      const options = {
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
      };
      console.log('Connecting to MongoDB...');
      await mongoose.connect(process.env.DB_HOST, options);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        handleError(error);
    }
  }

module.exports = connection;