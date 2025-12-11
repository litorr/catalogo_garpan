require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar Modelos
const Product = require('./models/Product');
const Order = require('./models/Order');

// Iniciar App y DB
const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a la Base de Datos
connectDB();

app.use(cors());
app.use(express.json());

// --- RUTAS API ---

// 1. Obtener Productos (Desde MongoDB)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    // Formateamos el precio para el frontend (añadir $) si lo guardaste como número
    const formattedProducts = products.map(p => ({
      ...p._doc,
      id: p._id, // React prefiere 'id' simple
      price: `$${p.price.toFixed(2)}` // Convertir 10.5 -> "$10.50"
    }));
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo productos' });
  }
});

// 2. Crear Orden (Guardar antes de ir a WhatsApp)
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, items, total } = req.body;
    
    const newOrder = new Order({
      customerName,
      items,
      total
    });

    await newOrder.save();
    res.status(201).json({ success: true, orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Validar Código Mayorista (Simple)
app.post('/api/validate-code', (req, res) => {
    const { codigo } = req.body;
    // En el futuro, esto se buscaría en la colección User
    const CODIGO_MAESTRO = "GARPAN2025"; 
    
    if (codigo && codigo.toUpperCase() === CODIGO_MAESTRO) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));