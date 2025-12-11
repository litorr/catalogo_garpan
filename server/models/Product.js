const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }, // Guardar como número: 10.50
  image: { type: String },
  categoria: { 
    type: String, 
    enum: ['reposteria', 'confiteria', 'helados', 'miscelaneos', 'plasticos', 'frutos', 'esencias', 'bebidas'],
    default: 'miscelaneos'
  },
  promo: { type: String, default: null } // Texto de oferta si existe
});

module.exports = mongoose.model('Product', productSchema);