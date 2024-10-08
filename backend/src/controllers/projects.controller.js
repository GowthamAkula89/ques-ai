const projectsServices = require("../services/projects.service")
const getProjects = async (req, res) => {
    const {email} = req.user;
    const projects = await projectsServices.getProjects(email);
    res.json({projects});
}

const addProject = async(req,res)=>{
    const {email} = req.user;
    const project = await projectsServices.addProject(email, req.body);
    res.send(project);
}

const updateProjectFiles = async(req, res) => {
    const { projectId } = req.params;
    const {email} = req.user;
    console.log("Email", email)
    const project = await projectsServices.updateProjectFiles(email, projectId, req.body);
    res.send(project);
}

const updateProjectFile = async(req,res) => {
    const{projectId, fileId} = req.params;
    const {email} = req.user;
    const project = await projectsServices.updateFile(email, projectId, fileId, req.body);
    res.send(project);
}

const deleteFile = async(req,res) => {
    const{projectId, fileId} = req.params;
    const {email} = req.user;
    const project = await projectsServices.deleteFile(email, projectId, fileId);
    res.send(project);
}

module.exports = {
    getProjects,
    addProject,
    updateProjectFiles,
    deleteFile,
    updateProjectFile
}