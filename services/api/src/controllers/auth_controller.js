const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Assumes bcryptjs is installed
const config = require('../config/config');

// Helper to generate JWT token
const getSignedJwtToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: config.jwtExpiration,
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res, next) => {
    const { name, email, password, location } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = await User.create({
            name,
            email,
            password: hashedPassword, // Store hashed password
            location,
        });

        // Generate token
        const token = getSignedJwtToken(user._id);

        res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server Error during registration' });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    try {
        // Check for user
        const user = await User.findOne({ email }).select('+password'); // Include password for comparison

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password); // Compare with hashed password

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate token
        const token = getSignedJwtToken(user._id);

        res.status(200).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server Error during login' });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    // This assumes an auth middleware has attached `req.user`
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Could not fetch user data' });
    }
};