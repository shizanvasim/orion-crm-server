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
const updateUser = 'UPDATE users SET username = $1, email = $2, role = $3, password = $4 WHERE id = $5';

// Update Location On Login
const updateLoginLocation = `UPDATE users SET login_location = $1 WHERE id = $2`

// Update Location On Logout
const updateLogoutLocation = `UPDATE users SET logout_location = $1 WHERE id = $2`

const updateUserWithoutPassword = `UPDATE users SET username = $1, email = $2, role = $3 WHERE user_id = $4`;


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    checkIfUsernameExists,
    updateUserWithoutPassword,
    updateLoginLocation,
    updateLogoutLocation
};