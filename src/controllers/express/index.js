var config = require('../../config');
var express = require('express');

var mainRoutes = express.Router();

mainRoutes.use('/api', require('./api'));

mainRoutes.get('*', (req,res) =>{
    res.sendFile(config.public_dir+'/build/index.html')
})

module.exports = mainRoutes;
