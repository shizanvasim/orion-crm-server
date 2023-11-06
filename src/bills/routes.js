const { Router } = require('express');
const controllers = require('./controllers');

const router = Router();

// Get Bills Route
router.get('/', controllers.getBills);

// Add New Bill Route
router.post('/', controllers.addBill);

// Delete Bill Route
router.delete('/:id', controllers.deleteBill);

// Update Bill Route
router.put('/:id', controllers.updateBill);

// Get Bill By Id Route
router.get('/:id', controllers.getBillById);

// Get Bill By Client Id Route
router.get('/client/:id', controllers.getBillByClientId);

module.exports = router;