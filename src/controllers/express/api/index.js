var config = require('../../../config');
var express = require('express');

var apiRoutes = express.Router();

apiRoutes.use("/users", require('./user'))

apiRoutes.use(require(config.library_dir + '/middleware').expressMiddleware)

apiRoutes.use("/projects", require('./project'))

module.exports = apiRoutes;
