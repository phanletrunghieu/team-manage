var express = require('express');
var app = express();
var helmet = require('helmet');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http').Server(app);
var config = require('../config');

const start = () => {
	return new Promise((resolve, reject)=>{
		app.use(helmet());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json({limit: '50mb', type: ['application/json', 'text/plain']}));
		app.use(express.static(config.public_dir));
		app.use((err, req, res, next) => {
			reject(new Error('Something went wrong!, err:' + err))
			res.status(500).send('Something went wrong!')
		})
		app.use(function(req, res, next){
			req.body=JSON.parse(JSON.stringify(req.body));
			req.query=JSON.parse(JSON.stringify(req.query));
			next();
		});

		app.use('/', require(config.controllers_dir+'/express'));

		const server = http.listen(process.env.PORT || config.port, config.host, ()=>resolve(server));
	});
}

module.exports = {start};