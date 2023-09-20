const { Router } = require('express');
const controllers = require('./controllers');

const router = Router();

// Define login-related routes

// Login
router.post('/login', controllers.login);

// Register
router.post('/register', controllers.register);

// Logout
router.post('/logout', controllers.logout);

// Forgot Password
router.post('/forgot-password', controllers.forgotPassword);

// Reset Password
router.post('/reset-password', controllers.resetPassword);

module.exports = router;
