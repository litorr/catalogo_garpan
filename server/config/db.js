const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/garpan_db";
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB Conectado Exitosamente');
  } catch (error) {
    console.error('❌ Error MongoDB:', error);
    process.exit(1); // Detener servidor si falla la DB
  }
};

module.exports = connectDB;