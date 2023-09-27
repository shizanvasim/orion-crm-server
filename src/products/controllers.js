const pool = require('../../db')
const queries = require('./queries')

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await pool.query(queries.getAllProducts)
        res.json(allProducts.rows)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Error Fetching Products')
    }
}

// Get Product By ID
const getProductById = async (req, res) => {
    const id = req.params.id
    try {
        const productById = await pool.query(queries.getProductById, [id])
        productById.rows.length === 0 ? res.json('Product Not Found') : res.json(productById.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).send(`Error Fetching Product With ID ${id}`)
    }
}

// Post Product
const addProduct = async (req, res) => {
    try {
        const { product_name, description, price, category, stock_quantity } = req.body
        const checkIfExists = await pool.query(queries.checkIfProductNameExists, [product_name])
        if (checkIfExists.rows.length > 0) {
            res.send('Product Aleady Exist With This Name')
        } else {
            await pool.query(queries.addProduct, [product_name, description, price, category, stock_quantity, new Date()])
            res.send('Product Added Successfully')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured whilte adding Product')
    }
}

// Edit Product
// Controllers.js
// Edit Product
const editProduct = async (req, res) => {
    try {
        const id = req.params.id
        const { product_name, description, price, category, stock_quantity } = req.body

        const checkIfExists = await pool.query(queries.checkIfProductNameExists, [product_name])

        if (checkIfExists.rows.length > 0 && checkIfExists.rows[0].product_id === parseInt(id)) {
            await pool.query(queries.updateProduct, [product_name, description, price, category, stock_quantity, id])
            res.send('Product Edited Successfully')
        } else {
            const checkIfExistsForOthers = await pool.query(queries.checkIfProductNameExists, [product_name])
            if (checkIfExistsForOthers.rows.length > 0) {
                res.send('Product Name Already Exist')
            } else {
                await pool.query(queries.updateProduct, [product_name, description, price, category, stock_quantity, id])
                res.send('Product Edited Successfully')

            }
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while editing Product')
    }
}


// Delete Products
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        await pool.query(queries.deleteProduct, [id])
        res.send('Product Deleted Successfully')
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occured while deleting Product')
    }
}

module.exports = { getAllProducts, getProductById, addProduct, deleteProduct, editProduct }