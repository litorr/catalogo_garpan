const mongoose = require('mongoose');
const Product = require('./models/Product');
const { products } = require('./productsData'); // Tu archivo actual de datos

// Configuración rápida de conexión
const MONGO_URI = 'mongodb+srv://rr490233:1234@cluster0.6cjln.mongodb.net/garpan_db?appName=Cluster0';

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB para Seed...');

    // Limpiar productos viejos
    await Product.deleteMany({});
    console.log('Productos anteriores eliminados.');

    // Convertir tus datos al formato del Schema
    const productsToInsert = products.map(p => ({
      title: p.title,
      description: p.description,
      // Convertir "$7.96" -> 7.96 (Número)
      price: parseFloat(p.price.replace('$', '')),
      image: p.image,
      categoria: p.categoria,
      promo: p.promo || null
    }));

    await Product.insertMany(productsToInsert);
    console.log('✅ ¡Productos importados exitosamente!');

    process.exit();
  } catch (error) {
    console.error('Error importando:', error);
    process.exit(1);
  }
};

seedProducts();