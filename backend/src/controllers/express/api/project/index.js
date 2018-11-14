var express = require('express');

var projectRoutes = express.Router();

projectRoutes.post("/", require('./create'))
projectRoutes.delete("/:project_id", require('./delete'))
projectRoutes.put("/:project_id", require('./update'))
projectRoutes.post("/:project_id/assign", require('./assign'))
projectRoutes.delete("/:project_id/assign", require('./unassign'))

let find = require('./find')
projectRoutes.get("/", find.findAll)
projectRoutes.get("/:project_id", find.byID)
projectRoutes.get("/:project_id/members", find.findMembers)

module.exports = projectRoutes;
