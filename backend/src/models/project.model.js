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
}, { timestamps: true }); 

// Schema for individual projects
const projectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    files: [fileSchema]
}, { timestamps: true });

const projectsSchema = mongoose.Schema({
    email: {
        type: String
    },
    projects: [projectSchema], 
}, { timestamps: true }); 

const Project = mongoose.model('Project', projectsSchema);
module.exports = Project;
