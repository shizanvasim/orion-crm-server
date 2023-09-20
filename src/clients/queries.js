const getAllClients = 'SELECT * FROM CLIENTS'

const getClientById = `SELECT * FROM CLIENTS WHERE client_id = $1`

const getAllProducts = 'SELECT * FROM PRODUCTS'

const getProductById = `SELECT * FROM PRODUCTS WHERE product_id = $1`

const getAllPurchaseProducts = 'SELECT * FROM PURCHASE_PRODUCTS'

const getPurchasedProductById = `SELECT * FROM PURCHASE_PRODUCTS WHERE purchase_id  = $1`

const getAllPurchases = 'SELECT * FROM PURCHASES'

const getPurchaseById = `SELECT * FROM PURCHASES WHERE purchase_id  = $1`

const checkEmailExists = `select s from clients s where email_id = $1;`

const checkMobileNo = `select s from clients s where mobile_no = $1;`

const addClient = `
    INSERT INTO clients (
        first_name,
        last_name,
        shop_name,
        mobile_no,
        email_id,
        gst_no,
        address,
        zip_code,
        area,
        products_purchased,
        purchased_dates,
        joined_on,
        paid
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
`;

const deleteClient = `DELETE FROM clients WHERE client_id = $1;`

const updateClient = `UPDATE clients SET first_name = $1, last_name = $2, shop_name = $3, mobile_no = $4, email_id = $5, gst_no = $6, address = $7, zip_code = $8, area = $9 WHERE client_id = $10;`


module.exports = {
    getAllClients,
    getClientById,
    getAllProducts,
    getProductById,
    getAllPurchaseProducts,
    getPurchasedProductById,
    getAllPurchases,
    getPurchaseById,
    checkEmailExists,
    checkMobileNo,
    addClient,
    deleteClient,
    updateClient
}