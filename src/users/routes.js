const {Router} = require('express')
const controllers = require('./controllers')

const router = Router()

// Get All Products Route
router.get('/', controllers.getAllUsers)

// Get Product By Id
router.get('/:id', controllers.getUserById)

// Edit Product
router.post('/', controllers.addUser)

// Delete Product
router.delete('/:id', controllers.deleteUser)

// Update Product
router.put('/:id', controllers.editUser)

// Update Login Location
router.put('/login-location/:user_id', controllers.updateLoginLocation)

// Update Logout Location
router.put('/logout-location/:user_id', controllers.updateLogoutLocation)

module.exports = router