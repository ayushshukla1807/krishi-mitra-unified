const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth_routes');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config({ path: '../.env' });

const app = express();
app.use(cors({ origin: '*' })); // Allow all origins for IoT streaming demo

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running: Krishi Mitra Backend is Online (with Socket.io)!'));

// Define API Routes
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Mock IoT Sensor Data Stream
let currentSensorData = {
    soilMoisture: 45.2,
    temperature: 28.5,
    humidity: 60.1,
    nitrogen: 120,
    phosphorus: 45,
    potassium: 30
};

io.on('connection', (socket) => {
    console.log(`[IoT Dashboard] Client connected: ${socket.id}`);
    
    // Send initial state
    socket.emit('sensor_update', currentSensorData);

    socket.on('disconnect', () => {
        console.log(`[IoT Dashboard] Client disconnected: ${socket.id}`);
    });
});

// Simulate live changing data
setInterval(() => {
    currentSensorData.soilMoisture += (Math.random() - 0.5) * 2;
    currentSensorData.temperature += (Math.random() - 0.5) * 0.5;
    currentSensorData.humidity += (Math.random() - 0.5) * 1.5;
    
    // Broadcast to all connected clients
    io.emit('sensor_update', {
        timestamp: new Date().toISOString(),
        ...currentSensorData
    });
}, 2000); // 2-second telemetry ticks

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`[Krishi Mitra] Backend + IoT Socket.io Server started on port ${PORT}`));