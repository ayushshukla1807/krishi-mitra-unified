const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // In newer Mongoose versions, `useCreateIndex` and `useFindAndModify` are deprecated
            // and should not be used.
        });
        console.log('MongoDB Connected successfully...');
    } catch (err) {
        console.error('MongoDB Connection Failed:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;