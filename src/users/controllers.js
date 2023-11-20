// usersController.js

const pool = require('../../db');
const userQueries = require('./queries'); // Import the user-related queries
const bcrypt = require('bcrypt')
const saltRounds = 10;

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await pool.query(userQueries.getAllUsers);
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error Fetching Users');
    }
};

// Get User By ID
const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const userById = await pool.query(userQueries.getUserById, [id]);
        userById.rows.length === 0 ? res.json('User Not Found') : res.json(userById.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error Fetching User With ID ${id}`);
    }
};

// Add User
const addUser = async (req, res) => {
    try {
        const { username, email, role, password } = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const checkIfExists = await pool.query(userQueries.checkIfUsernameExists, [username]);
        if (checkIfExists.rows.length > 0) {
            res.send('User Already Exists With This Username');
        } else {
            await pool.query(userQueries.addUser, [username, email, role, hash]);
            res.send('User Added Successfully');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding User');
    }
};


// Edit User
const editUser = async (req, res) => {
    try {
        const { id } = req.params; // Assuming you pass the user's ID as a parameter
        const { username, email, role, password } = req.body;

        // Check if the user with the given ID exists
        const checkIfExists = await pool.query(userQueries.checkIfUserExistsById, [id]);
        if (checkIfExists.rows.length === 0) {
            res.status(404).send('User Not Found');
            return;
        }

        // Generate a new hash for the password if a new one is provided
        let hash = checkIfExists.rows[0].password; // By default, use the existing hash
        if (password) {
            const salt = bcrypt.genSaltSync(saltRounds);
            hash = bcrypt.hashSync(password, salt);
        }

        // Update the user's information in the database
        await pool.query(userQueries.updateUser, [username, email, role, hash, id]);
        res.send('User Updated Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating User');
    }
};



// Login Location
const updateLoginLocation = async (req, res) => {
    try {
        const { id } = req.params; // Assuming you pass the user's ID as a parameter
        const { login_location } = req.body;

        // Check if the user with the given ID exists
        const checkIfExists = await pool.query(userQueries.getUserById, [id]);
        if (checkIfExists.rows.length === 0) {
            res.status(404).send('User Not Found');
            return;
        }

        // Update the user's login location in the database
        await pool.query(userQueries.updateLoginLocation, [login_location, id]);
        res.send('User Login Location Updated Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating User Login Location');
    }
};





// Logout Location
const updateLogoutLocation = async (req, res) => {
    try {
        const { id } = req.params; // Assuming you pass the user's ID as a parameter
        const { logout_location } = req.body;

        // Check if the user with the given ID exists
        const checkIfExists = await pool.query(userQueries.getUserById, [id]);
        if (checkIfExists.rows.length === 0) {
            res.status(404).send('User Not Found');
            return;
        }

        // Update the user's login location in the database
        await pool.query(userQueries.updateLogoutLocation, [logout_location, id]);
        res.send('User Logout Location Updated Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating User Login Location');
    }
};



// Edit User
// const editUser = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { username, email, password, role } = req.body;

//         // Check if a new password is provided
//         if (password) {
//             const salt = bcrypt.genSaltSync(saltRounds);
//             const hash = bcrypt.hashSync(password, salt);

//             // Update user with the hashed password
//             await pool.query(userQueries.updateUser, [username, email, hash, role, id]);
//         } else {
//             // Update user without changing the password
//             await pool.query(userQueries.updateUserWithoutPassword, [username, email, role, id]);
//         }

//         res.send('User Edited Successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while editing User');
//     }
// };


// Delete User
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query(userQueries.deleteUser, [id]);
        res.send('User Deleted Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting User');
    }
};

module.exports = { getAllUsers, getUserById, addUser, deleteUser, editUser, updateLoginLocation, updateLogoutLocation };