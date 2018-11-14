var config = require('../../../../config');
var response_express = require(config.library_dir+'/response').response_express;
var lib_common = require(config.library_dir+'/common');
var Project = require(config.models_dir + '/mongo/project');

module.exports = (req, res)=>{
    let miss=lib_common.checkMissParams(res, req.body, ["users"])
    if (miss) return

    let project_id = req.params.project_id

    Project.findOne({_id: project_id})
    .then(project=>{
        project.members = project.members.concat(req.body.users)
        return project.save()
    })
    .then(project=>{
        response_express.success(res, project)
    })
    .catch(err=>response_express.exception(res, err.message || err))
}
