const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cropName: {
        type: String,
        required: [true, 'Please add a crop name'],
        trim: true,
    },
    variety: {
        type: String,
        trim: true,
    },
    plantingDate: {
        type: Date,
        required: [true, 'Please add a planting date'],
    },
    expectedHarvestDate: {
        type: Date,
    },
    landArea: {
        type: Number,
        required: [true, 'Please specify the land area (e.g., in acres)'],
    },
    unit: {
        type: String,
        enum: ['acres', 'hectares', 'sq_meters'],
        default: 'acres',
    },
    currentStage: {
        type: String,
        enum: ['Germination', 'Vegetative', 'Flowering', 'Fruiting', 'Harvesting', 'Post-Harvest'],
        default: 'Germination',
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot be more than 500 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Crop', CropSchema);