var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost:27017/irix',
		dbConnectionUri: 'postgres://irix:1qaz2wsx@localhost:5432/irix_project',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		db: 'mongodb://localhost:27017/irix',
		dbConnectionUri: 'postgres://irix:1qaz2wsx@localhost:5432/irix_project',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	}
}