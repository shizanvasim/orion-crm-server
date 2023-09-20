const pool = require('../../db');
const queries = require('./queries');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Login User
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username exists in the database
        const userResult = await pool.query(queries.findUserByUsername, [username]);

        // If no user with the provided username exists, return an error
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const foundUser = userResult.rows[0]

        // Compare the provided password with the hashed password in the database
        const storedPassword = userResult.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, storedPassword);

        // If the passwords match, authentication is successful
        if (passwordMatch) {
            let token
            try {
                token = jwt.sign(
                    { userId: foundUser.user_id, username: foundUser.username, email: foundUser.email, role: foundUser.role, createdAt: foundUser.created_at },
                    "secretkeyappearshere",
                    { expiresIn: '1h' }
                )
            } catch (error) {
                console.error('errpr', error)
            }
            res.status(200).json({
                message: "Login Successful",
                success: true,
                data: {
                    userData: {
                        userId: foundUser.user_id,
                        username: foundUser.username,
                        email: foundUser.email,
                    },
                    token: token,
                },
            });
            console.log("LoggedIn Successful")
        } else {
            // If passwords do not match, return an error
            res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
}

// Register User
const register = async (req, res) => {
    try {
        // Your registration logic here
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during registration');
    }
}

// Logout User
const logout = async (req, res) => {
    try {
        res.clearCookie('token'); // Clear the authentication token cookie

        res.status(200).json({success: true, message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during logout' });
    }
}

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        // Your forgot password logic here
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during password reset request');
    }
}

// Reset Password
const resetPassword = async (req, res) => {
    try {
        // Your password reset logic here
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during password reset');
    }
}

module.exports = { login, register, logout, forgotPassword, resetPassword };
