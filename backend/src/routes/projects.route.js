const express =  require("express");
const projectsRoute = require("../controllers/projects.controller");
const { authenticateJWT } = require("../middlewares/auth");
const router = express.Router();
router.post("/", authenticateJWT, projectsRoute.addProject);
router.get("/", authenticateJWT, projectsRoute.getProjects);
router.patch("/:projectId/files", projectsRoute.updateProjectFiles);
router.patch("/:projectId/files/:fileId", projectsRoute.updateProjectFile)
router.delete("/:projectId/files/:fileId", projectsRoute.deleteFile);
module.exports = router;