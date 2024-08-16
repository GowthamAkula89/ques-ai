const mongoose = require('mongoose');

// Helper function to get current IST time
const getISTTime = () => {
    const now = new Date();
    const offsetIST = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const istTime = new Date(now.getTime() + offsetIST);
    return istTime;
};

// Schema for individual files within a project
const fileSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true,
        trim: true
    },
    fileDescription: {
        type: String,
        required: true,
        trim: true
    },
});

const projectSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    project: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    files: [fileSchema],
    createdAtIST: {
        type: Date,
        default: getISTTime
    },
    updatedAtIST: {
        type: Date,
        default: getISTTime
    }
});

// Pre-save hook to update the `updatedAtIST` field
projectSchema.pre('save', function(next) {
    this.updatedAtIST = getISTTime();
    next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
