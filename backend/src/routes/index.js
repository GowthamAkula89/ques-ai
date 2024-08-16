const express = require('express');
const router = express.Router();
const userRoute = require("./user.route")
const projectRoute = require("./projects.route")
router.use("/user", userRoute)
router.use("/project", projectRoute)
module.exports = router;