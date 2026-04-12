const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/auth_controller');
// const { protect } = require('../middlewares/auth_middleware'); // Placeholder for authentication middleware

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private routes (would use a 'protect' middleware)
router.get('/me', /* protect, */ getMe); // Uncomment 'protect' for actual auth

module.exports = router;