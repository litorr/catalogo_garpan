const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importamos tus módulos
const { iniciarSesionSeniat, consultarRif } = require('./seniatService');
const { products } = require('./productsData');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors()); // Permite que React (puerto 5173/3000) hable con Node (puerto 3001)
app.use(bodyParser.json());

// --- RUTA 1: Obtener Productos ---
app.get('/api/products', (req, res) => {
    // Aquí simulamos una base de datos.
    // En el futuro, aquí harías: await Product.find({}) con MongoDB
    res.json(products);
});

// --- RUTA 2: Iniciar SENIAT (Obtener Captcha) ---
app.get('/api/seniat/captcha', async (req, res) => {
    try {
        console.log("Solicitando Captcha al SENIAT...");
        const img = await iniciarSesionSeniat();
        res.json({ success: true, image: img });
    } catch (e) {
        console.error("Error en captcha:", e);
        res.status(500).json({ success: false, error: "Error conectando al SENIAT. Intente mas tarde." });
    }
});

// --- RUTA 3: Verificar RIF ---
app.post('/api/seniat/verify', async (req, res) => {
    const { rif, codigo } = req.body;
    console.log(`Verificando RIF: ${rif} con código: ${codigo}`);
    
    try {
        const resultado = await consultarRif(rif, codigo);
        res.json(resultado);
    } catch (e) {
        console.error("Error en verificación:", e);
        res.status(500).json({ success: false, error: "Error interno verificando RIF." });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
    console.log(`📡 Esperando peticiones de React...`);
});