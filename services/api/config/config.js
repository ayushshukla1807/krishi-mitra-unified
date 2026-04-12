// Centralized configuration for environment variables
// Pulls values from process.env (which are loaded from .env file by dotenv)

module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/krishimitra_db',
    jwtSecret: process.env.JWT_SECRET || 'fallback_secret_for_jwt_development',
    jwtExpiration: process.env.JWT_EXPIRES_IN || '1h',
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development'
};