// usersQueries.js

// Retrieve all users
const getAllUsers = 'SELECT * FROM users';

// Retrieve a user by their ID
const getUserById = 'SELECT * FROM users WHERE user_id = $1';

// Insert a new user
const addUser = 'INSERT INTO users (username, email, role, password) VALUES ($1, $2, $3, $4)';

// Check if a username already exists
const checkIfUsernameExists = 'SELECT * FROM users WHERE username = $1';

// Delete a user by their ID
const deleteUser = 'DELETE FROM users WHERE user_id = $1';

// Update a user's information by their ID
const updateUser = 'UPDATE users SET username = $1, email = $2, password = $3, role = $4 WHERE user_id = $5';

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    checkIfUsernameExists
};