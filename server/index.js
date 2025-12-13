require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // Importar DB
const upload = require('./middleware/upload'); // Importar Multer
const auth = require('./middleware/auth');

// Inicializar y Conectar
const app = express();
const PORT = process.env.PORT || 3001;
connectDB(); // <--- Conexión limpia

// Middlewares
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/authRoutes'));
app.use('/api', require('./routes/authRoutes'));

// Ruta Upload (Única ruta suelta por ser utilitaria)
app.post('/api/upload', auth, upload.single('image'), (req, res) => {
  if(!req.file) return res.status(400).json({success: false, error: 'No se subió archivo'});
  // Normalizar slashes para Windows/Linux
  const filePath = req.file.path.replace(/\\/g, "/"); 
  res.json({ success: true, filePath: filePath }); // Ojo: Multer devuelve la ruta completa a veces
});

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));