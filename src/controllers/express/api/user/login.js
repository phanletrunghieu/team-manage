var config = require('../../../../config');
var response_express = require(config.library_dir+'/response').response_express;
var lib_common = require(config.library_dir+'/common');
var lib_password = require(config.library_dir+'/password');
var User = require(config.models_dir + '/mongo/user');

module.exports = (req, res)=>{
    let miss=lib_common.checkMissParams(res, req.body, ["username", "password"])
    if (miss) return

    User.findOne({username: req.body.username})
    .then(user=>{
        if (!user) {
            return Promise.reject("user not exist")
        }

        let tokenPayload = {
            _id: user._id,
            username: user.username
        }

        return Promise.all([
            lib_password.comparePassword(req.body.password, user.password_hash),
            lib_common.createToken(tokenPayload, "2 days"),
            lib_common.createToken(tokenPayload, "30d"),
        ])
    })
    .then(result=>{
        let isMatchPassword = result[0]
        let token = result[1]
        let refresh_token = result[2]
        if(!isMatchPassword){
            return Promise.reject("password not match")
        }

        response_express.success(res, {token,refresh_token})
    })
    .catch(err=>{
        response_express.exception(res, err.message || err);
        console.log(err);
        
    })
}