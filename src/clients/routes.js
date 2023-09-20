const { Router } = require('express')
const controllers = require('./controllers')

const router = Router()

// Get Clients Route
router.get('/', controllers.getClients)

// Add New Client Route
router.post('/', controllers.addClient)

// Delete Client Route
router.delete('/:id', controllers.deleteClient)

// Update Client Route
router.put('/:id', controllers.updateClient)

// Get Client By Id Route
router.get('/:id', controllers.getClientById)


module.exports = router