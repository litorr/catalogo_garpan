const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login Admin
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, error: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, error: "Contraseña incorrecta" });

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' }, (err, token) => {
      if (err) throw err;
      res.json({ success: true, token });
    });
  } catch (error) {
    res.status(500).send('Error en servidor');
  }
};

// Validar código mayorista
exports.validateCode = (req, res) => {
  const { codigo } = req.body;
  if (codigo === process.env.WHOLESALE_CODE) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};