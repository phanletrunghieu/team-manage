var config = require('../../../../config');
var response_express = require(config.library_dir+'/response').response_express;
var Project = require(config.models_dir + '/mongo/project');

module.exports = (req, res)=>{
    let project_id = req.params.project_id
    Project.deleteOne({_id: project_id})
    .then(()=>{
        response_express.success(res)
    })
    .catch(err=>response_express.exception(res, err.message || err))
}
