var config = require('../../../../config');
var response_express = require(config.library_dir+'/response').response_express;
var Project = require(config.models_dir + '/mongo/project');

exports.byID = (req, res)=>{
    let project_id = req.params.project_id
    Project.findOne({_id: project_id})
    .then(project=>{
        if (!project) {
            return Promise.reject("project not exist")
        }
        response_express.success(res, project)
    })
    .catch(err=>response_express.exception(res, err.message || err))
}

exports.findAll = (req, res)=>{
    Project.find({})
    .then(projects=>response_express.success(res, projects))
    .catch(err=>response_express.exception(res, err.message || err))
}

exports.findMembers = (req, res) => {
    let project_id = req.params.project_id
    Project.findOne({_id: project_id})
    .populate("members")
    .then(project=>{
        if (!project) {
            return Promise.reject("project not exist")
        }
        response_express.success(res, project.members)
    })
    .catch(err=>response_express.exception(res, err.message || err))
}