const path = require('path')
const baseURL = 'http://localhost:8080'

function resolve(dir) {
	return path.join(__dirname, dir)
}
// const TransformPages = require('uni-read-pages')
// const tfPages = new TransformPages({
// 	includes: ['path', 'aliasPath', 'name', 'meta', 'title'] //需要获取包涵的字段
// })
const TransformPages = require('uni-read-pages')

// }

module.exports = {
	transpileDependencies: ['uview-ui'],
	configureWebpack: {
		resolve: {
			alias: {
				"@": resolve("/")
			}
		},
		plugins: [
		],

		devServer: {
			port: 8061,
			disableHostCheck: true,
			proxy: {
				'/api/v1': {
					target: baseURL,
					secure: false,
					changeOrigin: true,
					pathRewrite: {
						'^/api/v1': '/api/v1'
					}
				}

			}
		}

	}
}
