var config = require('../../../../config');
var response_express = require(config.library_dir+'/response').response_express;
var Project = require(config.models_dir + '/mongo/project');

module.exports = (req, res)=>{
    let project_id = req.params.project_id
    Project.findById(project_id)
    .then(project=>{
        if (!project) {
            return Promise.reject("project not exist")
        }

        Object.assign(project, req.body.project)

        return project.save()
    })
    .then(project=>{
        response_express.success(res, project)
    })
    .catch(err=>response_express.exception(res, err.message || err))
}
