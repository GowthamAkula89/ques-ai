
const projectsServices = require("../services/projects.service")
const getProjects = async (req, res) => {
    const projects = await projectsServices.getProjects();
    res.json({projects});
}
const addProject = async(req,res)=>{
    const project = await projectsServices.addProject(req.body);
    res.send(project);

}
const updateProjectFiles = async(req, res) => {
    const { projectId } = req.params;
    const project = await projectsServices.updateProjectFiles(projectId, req.body);
    res.send(project);
}


const updateProjectFile = async(req,res) => {
    const{projectId, fileId} = req.params;
    const project = await projectsServices.updateFile(projectId, fileId, req.body);
    res.send(project);
}
const deleteFile = async(req,res) => {
    const{projectId, fileId} = req.params;
    const project = await projectsServices.deleteFile(projectId, fileId);
    res.send(project);
}
module.exports = {
    getProjects,
    addProject,
    updateProjectFiles,
    deleteFile,
    updateProjectFile
}