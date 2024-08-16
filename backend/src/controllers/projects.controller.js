
const projectsServices = require("../services/projects.service")
const getProjects = async (req, res) => {
    const {email} = req.body;
    const projects = await projectsServices.getProjects(email);
    res.json({projects});
}
const addProject = async(req,res)=>{
    const project = await projectsServices.addProject(req.body);
    res.send(project);
}
const updateProjectFiles = async(req, res) => {
    const { projectId } = req.params;
    const {email, fileData} = req.body;
    const project = await projectsServices.updateProjectFiles(email, projectId, fileData);
    res.send(project);
}

const updateProjectFile = async(req,res) => {
    const{projectId, fileId} = req.params;
    const {email, file} = req.body;
    const project = await projectsServices.updateFile(projectId, fileId, file);
    res.send(project);
}
const deleteFile = async(req,res) => {
    const{projectId, fileId} = req.params;
    const {email} = req.body;
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