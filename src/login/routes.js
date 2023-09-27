const { Router } = require('express');
const controllers = require('./controllers');
const userControllers = require('../users/controllers')
const jwt = require('jsonwebtoken');

const router = Router();

// Define login-related routes

// Login
router.post('/', controllers.login);

// Register
router.post('/register', userControllers.addUser);

// Logout
router.post('/logout', controllers.logout);

// Forgot Password
router.post('/forgot-password', controllers.forgotPassword);

// Reset Password
router.post('/reset-password', controllers.resetPassword);


// Middleware to verify JWT token
function verifyJwt(req, res, next) {
    // Get the token from the request body
    const token = req.body.token;

    // Check if token is missing
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using your secret key
        const decoded = jwt.verify(token, 'secretkeyappearshere');

        // Check if the token is expired
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp <= currentTimestamp) {
            return res.status(401).json({ message: 'Token is expired' });
        }

        // You can now access the decoded data in your route handlers
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Token is invalid
        return res.status(401).json({ message: 'Token is invalid' });
    }
}

// Protected
router.post('/protected', verifyJwt, (req, res) => {
    const user = req.user;

    res.status(200).json({ user, message: 'Protected' });
});


module.exports = router;
