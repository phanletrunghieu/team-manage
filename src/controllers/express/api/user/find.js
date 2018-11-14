var config = require('../../../../config');
var response_express = require(config.library_dir+'/response').response_express;
var User = require(config.models_dir + '/mongo/user');
var Project = require(config.models_dir + '/mongo/project');

exports.byID = (req, res)=>{
    let user_id = req.params.user_id
    User.findOne({_id: user_id})
    .then(user=>{
        if (!user) {
            return Promise.reject("user not exist")
        }
        response_express.success(res, user)
    })
    .catch(err=>response_express.exception(res, err.message || err))
}

exports.findAll = (req, res)=>{
    User.find({})
    .then(users=>response_express.success(res, users))
    .catch(err=>response_express.exception(res, err.message || err))
}

exports.findProjectCreate = (req, res)=>{
    Project.find({
        creator: req.token_info._id
    })
    .then(projects=>response_express.success(res, projects))
    .catch(err=>response_express.exception(res, err.message || err))
}

exports.findProjectAssign = (req, res)=>{
    Project.find({
        members: {"$all": [req.token_info._id]}
    })
    .then(projects=>response_express.success(res, projects))
    .catch(err=>response_express.exception(res, err.message || err))
}