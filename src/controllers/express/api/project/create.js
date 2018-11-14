var config = require('../../../../config');
var response_express = require(config.library_dir+'/response').response_express;
var lib_common = require(config.library_dir+'/common');
var Project = require(config.models_dir + '/mongo/project');

module.exports = (req, res)=>{
    let miss=lib_common.checkMissParams(res, req.body, ["project"])
    if (miss) return

    let p = Object.assign(req.body.project, {creator: req.token_info._id})

    Project.create(p)
    .then(project=>{
        response_express.success(res, project)
    })
    .catch(err=>response_express.exception(res, err.message || err))
}
