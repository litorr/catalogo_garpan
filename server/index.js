require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const bcrypt = require('bcryptjs'); // NUEVO
const jwt = require('jsonwebtoken'); // NUEVO
const auth = require('./middleware/auth'); // NUEVO

const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Importar Modelos
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');

// Iniciar App y DB
const app = express();
const PORT = process.env.PORT || 3001;


// --- CONFIGURACIÓN DE MULTER (Subida de archivos) ---
// Crear carpeta 'uploads' si no existe
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Guardar en carpeta uploads
  },
  filename: function (req, file, cb) {
    // Nombre único: fecha + nombre original
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

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
    
    // Ahora leemos la contraseña desde el archivo .env
    // Si no existe en el .env, usamos una por defecto por seguridad
    const CODIGO_MAESTRO = process.env.WHOLESALE_CODE || "GARPAN2025"; 
    
    if (codigo && codigo.toUpperCase() === CODIGO_MAESTRO) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

// 4. Obtener todas las órdenes (Para el Admin)
app.get('/api/orders', auth, async (req, res) => {
  try {
    // Buscamos todas las órdenes y las ordenamos por fecha (la más nueva primero)
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, error: "Error obteniendo órdenes" });
  }
});

// 5. Login de Administrador
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, error: "Usuario no encontrado" });

    // Comparar contraseña encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, error: "Contraseña incorrecta" });

    // Crear Token
    const payload = { user: { id: user.id, role: user.role } };
    
    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '8h' }, // El token dura 8 horas
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, token }); // Devolvemos el token al frontend
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).send('Error en servidor');
  }
});

// 1.1. Crear nuevo producto (POST)
app.post('/api/products', auth, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 1.2. Actualizar producto (PUT)
app.put('/api/products/:id', auth, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Devuelve el producto actualizado
    );
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 1.3. Eliminar producto (DELETE)
app.delete('/api/products/:id', auth,async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2.1 Actualizar estado de una orden (NUEVO)
app.put('/api/orders/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Devuelve la orden actualizada
    );
    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error actualizando orden" });
  }
});

// RUTA NUEVA: Subir imagen
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    // Devolvemos la ruta relativa que guardaremos en la BD
    // OJO: Windows usa backslashes (\), los cambiamos a slash (/)
    const filePath = `uploads/${req.file.filename}`;
    res.json({ success: true, filePath: filePath });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));