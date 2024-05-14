const path = require('path')
const baseURL = 'http://localhost:8080'

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				"@": resolve("/src")
			}
		},
		plugins: [
		],

	}
}
