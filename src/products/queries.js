const getAllProducts = 'SELECT * FROM products'
const getProductById = `SELECT * FROM products WHERE product_id = $1`

// Add other queries related to products here

const addProduct = `INSERT INTO products (product_name, description, price, category, stock_quantity) VALUES ($1, $2, $3, $4, $5);`
const checkIfProductNameExists = `SELECT * FROM products WHERE product_name = $1`
const deleteProduct = `DELETE FROM products WHERE product_id = $1;`
const updateProduct = `UPDATE products SET product_name = $1, description = $2, price = $3, category = $4, stock_quantity = $5 WHERE product_id = $6;`

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,
    checkIfProductNameExists
}