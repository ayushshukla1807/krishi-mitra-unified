const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false, // Don't return password by default
    },
    location: {
        type: String,
        required: [true, 'Please specify your farm location/region'],
    },
    crops: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Crop', // References a Crop model
        },
    ],
    role: {
        type: String,
        enum: ['farmer', 'expert', 'admin'],
        default: 'farmer',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to hash password before saving (would require bcryptjs)
// UserSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// Method to compare entered password with hashed password
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model('User', UserSchema);