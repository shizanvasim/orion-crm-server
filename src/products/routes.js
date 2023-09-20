const {Router} = require('express')
const controllers = require('./controllers')

const router = Router()

// Get All Products Route
router.get('/', controllers.getAllProducts)

// Get Product By Id
router.get('/:id', controllers.getProductById)

// Edit Product
router.post('/', controllers.addProduct)

// Delete Product
router.delete('/:id', controllers.deleteProduct)

// Update Product
router.put('/:id', controllers.editProduct)

module.exports = router