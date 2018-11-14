var config = require('../../../../config');
var express = require('express');

var userRoutes = express.Router();

userRoutes.post("/login", require('./login'))
userRoutes.post("/", require('./create'))

userRoutes.use(require(config.library_dir + '/middleware').expressMiddleware)

userRoutes.delete("/:user_id", require('./delete'))
userRoutes.put("/:user_id", require('./update'))

let find = require('./find')
userRoutes.get("/", find.findAll)
userRoutes.get("/:user_id", find.byID)
userRoutes.get("/projects/assign", find.findProjectAssign)
userRoutes.get("/projects/create", find.findProjectCreate)

module.exports = userRoutes;
