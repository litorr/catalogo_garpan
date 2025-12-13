const Product = require('../models/Product');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Crear producto
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};