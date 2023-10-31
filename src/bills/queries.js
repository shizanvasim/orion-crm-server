const getAllBills = 'SELECT * FROM BILLS';

const getBillById = 'SELECT * FROM BILLS WHERE invoice_id = $1';

const addBill = `
    INSERT INTO BILLS (
        invoice_no,
        invoice_date,
        product,
        stock,
        amount,
        payment_status,
        payment_date,
        client_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
`;

const deleteBill = 'DELETE FROM BILLS WHERE invoice_id = $1';

const updateBill = `
    UPDATE BILLS
    SET invoice_date = $1, product = $2, stock = $3, amount = $4, payment_status = $5, payment_date = $6, client_id = $7
    WHERE invoice_id = $8;
`;

module.exports = {
    getAllBills,
    getBillById,
    addBill,
    deleteBill,
    updateBill
};