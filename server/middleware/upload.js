const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Asegurar que la carpeta existe
const uploadDir = path.join(__dirname, '../uploads'); // Nota el '../'
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ruta relativa desde la raíz del server
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

module.exports = multer({ storage: storage });