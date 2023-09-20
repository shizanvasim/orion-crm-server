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
        const id = req.params.id;
        const { username, email, password, role } = req.body;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const checkIfExists = await pool.query(userQueries.checkIfUsernameExists, [username]);

        if (checkIfExists.rows.length > 0 && checkIfExists.rows[0].user_id === parseInt(id)) {
            await pool.query(userQueries.updateUser, [username, email, hash, role, id]);
            res.send('User Edited Successfully');
        } else {
            const checkIfExistsForOthers = await pool.query(userQueries.checkIfUsernameExists, [username]);
            if (checkIfExistsForOthers.rows.length > 0) {
                res.send('Username Already Exists');
            } else {
                await pool.query(userQueries.updateUser, [username, email, password, role, id]);
                res.send('User Edited Successfully');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while editing User');
    }
};

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

module.exports = { getAllUsers, getUserById, addUser, deleteUser, editUser };