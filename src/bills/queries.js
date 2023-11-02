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
    SET invoice_no = $1, invoice_date = $2, product = $3, stock = $4, amount = $5, payment_status = $6, payment_date = $7, client_id = $8
    WHERE invoice_id = $9;
`;

module.exports = {
    getAllBills,
    getBillById,
    addBill,
    deleteBill,
    updateBill
};
