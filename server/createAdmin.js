require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // <--- NUEVO
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/garpan_db');
    console.log('Conectado a DB...');

    // Borrar admins anteriores
    await User.deleteMany({ role: 'admin' });

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('1234', salt); // <--- CAMBIA ESTO POR TU CONTRASEÑA

    const admin = new User({
      username: 'admin',
      password: hashedPassword, // Guardamos la encriptada
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin creado/actualizado con contraseña encriptada.');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();