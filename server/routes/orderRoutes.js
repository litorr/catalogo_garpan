const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Rutas: /api/orders
router.post('/', orderController.createOrder);
router.get('/', auth, orderController.getOrders);
router.put('/:id/status', auth, orderController.updateOrderStatus);

module.exports = router;