const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Usaremos la variable de entorno o una local por defecto
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/garpan_db');
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`🔴 Error conectando a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;