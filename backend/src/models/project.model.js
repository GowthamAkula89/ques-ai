const mongoose = require('mongoose');
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
    },{ timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
