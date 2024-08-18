const httpStatus = require("http-status");
const Project = require("../models/project.model")

const addProject = async (email, projectDetails) => {
    let project = await Project.findOne({ email: email });
    console.log("Project", project)
    if (!project) {
        try {
            project = await Project.create({
                email: email,
                projects: [projectDetails]
            });
        } catch (err) {
            console.log(err);
            throw new Error(httpStatus.INTERNAL_SERVER_ERROR, "User project creation failed");
        }
    } else {
        project.projects.push(projectDetails);
        await project.save();
    }
    return project;
};

const getProjects = async(email) => {
    console.log(email);
    const account = await Project.findOne({ email: email });
    console.log("account",account)
    if (!account) {
        console.log({message: "projects not added"});
        return [];
    }
    return account.projects;
}

const updateProjectFiles = async (email, projectId, projectFile) => {
    const account = await Project.findOne({ email: email });
    
    if (!account) {
        throw new Error(httpStatus.NOT_FOUND, "User not found");
    }
    const project = account.projects.id(projectId);
    if (!project) {
        throw new Error(httpStatus.NOT_FOUND, "No such project exists");
    }
    project.files.push(projectFile);
    await account.save();
    return project;
}

const updateFile = async (email, projectId, fileId, updateFileData) => {
    try {
        const account = await Project.findOne({ email: email });
        if (!account) {
            throw new Error("User not found");
        }
        const project = account.projects.id(projectId);
        if (!project) {
            throw new Error("No such project exists");
        }

        console.log(project)
        const file = project.files.id(fileId);
        if (!file) {
            throw new Error("No such file exists in the project");
        }
        file.fileName = updateFileData.fileName || file.fileName;
        file.fileDescription = updateFileData.fileDescription || file.fileDescription;
    
        await account.save();
        return project;
    } catch (error) {
        console.error("Error updating file:", error);
        throw error;
    }
};

const deleteFile = async (email, projectId, fileId) => {
    const account = await Project.findOne({email : email});
    const project = account.projects.id(projectId);
    if (!project) throw new Error(httpStatus.NOT_FOUND, "No such project exists");

    const fileIndex = project.files.findIndex(file => file._id.toString() === fileId);
    if (fileIndex === -1) throw new Error(httpStatus.NOT_FOUND, "File not found");

    project.files.splice(fileIndex, 1);
    await account.save();
    return project;
}

module.exports = {
    addProject,
    getProjects,
    updateProjectFiles,
    deleteFile,
    updateFile
}