const pool = require("../../db");
const queries = require("./queries");


// Get Clients
const getClients = (req, res) => {
  pool.query(queries.getAllClients, (err, results) => {
    if (err) throw new Error("Errors Fetching Clients");
    res.status(200).json(results.rows);
  });
};


// Get Client By Id
const getClientById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getClientById, [id], (err, results) => {
    if (err) throw new Error("Errors Fetching Clients");
    res.status(200).json(results.rows);
  });
};


// Add Client
const addClient = async (req, res) => {
  const {
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
    paid,
    user_id
  } = req.body;

  console.log(req.body)

  console.log(req.files)

  try {
    const mobileResults = await pool.query(queries.checkMobileNo, [mobile_no]);
    if (mobileResults.rows.length) {
      return res.send("Mobile No Already Registered.");
    }

    const emailResults = await pool.query(queries.checkEmailExists, [email_id]);
    if (emailResults.rows.length) {
      return res.send("Email Already Exists.");
    }

    const addClientResult = await pool.query(queries.addClient, [
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
      new Date(),
      paid,
      user_id
    ]);
    res.status(201).send("Client Added Successfully");
    console.log(addClientResult.rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
};

// Delete Client
const deleteClient = (req, res) => {
  const id = req.params.id;

  pool.query(queries.deleteClient, [id], (err, results) => {
    if (err) throw new Error("Error Deleting Client");

    res.status(201).send("Client Deleted Successfully");

    console.log(results.rows);
  });
};


// Update Client
const updateClient = async (req, res) => {
  const id = req.params.id;
  const {
    first_name,
    last_name,
    shop_name,
    mobile_no,
    email_id,
    gst_no,
    address,
    zip_code,
    area,
    paid
  } = req.body;

  try {
    const getClient = await pool.query(queries.getClientById, [id]);

    if (getClient.rows.length) {
      // Check if the provided mobile number or email already exist for other users
      const checkDuplicateQuery = `
                SELECT * 
                FROM clients 
                WHERE (mobile_no = $1 OR email_id = $2) AND client_id != $3;
            `;
      const duplicateCheckResult = await pool.query(checkDuplicateQuery, [
        mobile_no,
        email_id,
        id,
      ]);

      if (duplicateCheckResult.rows.length > 0) {
        res.status(400).send("Mobile number or email already exists for another user.");
      } else {
        const updateQuery = await pool.query(queries.updateClient, [
          first_name,
          last_name,
          shop_name,
          mobile_no,
          email_id,
          gst_no,
          address,
          zip_code,
          area,
          id,
        ]);

        res.status(200).send("Client Edited Successfully");

        console.log(updateQuery.rows);
      }
    } else {
      console.log("Client Not Found");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("An error occurred while updating the client.");
  }
};

module.exports = {
  getClients,
  getClientById,
  addClient,
  deleteClient,
  updateClient,
};
