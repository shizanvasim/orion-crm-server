// Query to find a user by username
const findUserByUsername = `
    SELECT * FROM users
    WHERE username = $1;
`;

// Query to insert a new user into the database
const insertNewUser = `
    INSERT INTO users (username, password, email, role)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id;
`;

// Query to update a user's password
const updatePassword = `
    UPDATE users
    SET password = $1
    WHERE user_id = $2;
`;

module.exports = {
    findUserByUsername,
    insertNewUser,
    updatePassword
};