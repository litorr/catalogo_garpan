const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String }, // En un futuro, aquí iría la contraseña encriptada
  role: { 
    type: String, 
    enum: ['admin', 'mayorista', 'cliente'], 
    default: 'cliente' 
  },
  rif: { type: String }, // Para mayoristas
  wholesaleCode: { type: String }, // Código personal de acceso (opcional)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);