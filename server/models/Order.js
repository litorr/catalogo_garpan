const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String }, // Para contactarlo si falla WhatsApp
  items: [
    {
      productTitle: String,
      quantity: Number,
      price: Number // Precio al momento de la compra
    }
  ],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pendiente', 'completado', 'cancelado'], 
    default: 'pendiente' 
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);