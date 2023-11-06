const pool = require("../../db");
const queries = require("./queries");

// Get Bills
const getBills = (req, res) => {
    pool.query(queries.getAllBills, (err, results) => {
        if (err) throw new Error("Error Fetching Bills");
        res.status(200).json(results.rows);
    });
};

// Get Bill By Id
const getBillById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBillById, [id], (err, results) => {
        if (err) throw new Error("Error Fetching Bill");
        res.status(200).json(results.rows);
    });
};

const getBillByClientId = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBillByClientId, [id], (err, results) => {
        if (err) throw new Error("Error Fetching Bill");
        res.status(200).json(results.rows);
    });
};

// Add Bill
const addBill = async (req, res) => {
    const {
        invoice_no,
        invoice_date,
        product,
        stock,
        amount,
        payment_status,
        payment_date,
        client_id,
    } = req.body;

    try {
        const addBillResult = await pool.query(queries.addBill, [
            invoice_no,
            invoice_date,
            product,
            stock,
            amount,
            payment_status,
            payment_date,
            client_id,
        ]);
        res.status(201).send("Bill Added Successfully");
        console.log(addBillResult.rows);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred while adding the bill.");
    }
};

// Delete Bill
const deleteBill = (req, res) => {
    const id = req.params.id;
    pool.query(queries.deleteBill, [id], (err, results) => {
        if (err) throw new Error("Error Deleting Bill");
        res.status(201).send("Bill Deleted Successfully");
        console.log(results.rows);
    });
};

// Update Bill
const updateBill = async (req, res) => {
    const id = req.params.id;
    const {
        invoice_no,
        invoice_date,
        product,
        stock,
        amount,
        payment_status,
        payment_date,
        client_id,
        invoice_id
    } = req.body;

    try {
        const getBill = await pool.query(queries.getBillById, [id]);

        console.log(req.body)

        if (getBill.rows.length) {
            const updateQuery = await pool.query(queries.updateBill, [
                invoice_no,
                invoice_date,
                product,
                stock,
                amount,
                payment_status,
                payment_date,
                client_id,
                invoice_id
            ]);

            res.status(200).send("Bill Edited Successfully");
        } else {
            console.log("Bill Not Found");
        }
    } catch (err) {
        console.error("E:", err);
        res.status(500).send("An error occurred while updating the bill.");
    }
};

module.exports = {
    getBills,
    getBillById,
    addBill,
    deleteBill,
    updateBill,
    getBillByClientId
};
