const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth_routes');
// const cropRoutes = require('./routes/crop_routes'); // Placeholder
// const weatherRoutes = require('./routes/weather_routes'); // Placeholder

dotenv.config({ path: '../.env' }); // Load .env from parent directory

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // Allows us to get data in req.body

app.get('/', (req, res) => res.send('API Running: Krishi Mitra Backend is Online!'));

// Define API Routes
app.use('/api/auth', authRoutes);
// app.use('/api/crops', cropRoutes); // Example: app.use('/api/crops', require('./routes/crop_routes'));
// app.use('/api/weather', weatherRoutes); // Example: app.use('/api/weather', require('./routes/weather_routes'));

// Error handling middleware (optional but good practice)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Krishi Mitra Backend server started on port ${PORT}`));