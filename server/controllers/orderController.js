const Order = require('../models/Order');

// Crear orden
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    
    // Devolvemos el ID para el mensaje de WhatsApp
    res.status(201).json({ success: true, orderId: newOrder._id });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Obtener órdenes (Admin)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Actualizar estado
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error actualizando orden" });
  }
};