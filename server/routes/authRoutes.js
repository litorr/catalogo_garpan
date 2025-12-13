const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas: /api/auth (o directas según configuremos)
router.post('/login', authController.login);
router.post('/validate-code', authController.validateCode);

module.exports = router;