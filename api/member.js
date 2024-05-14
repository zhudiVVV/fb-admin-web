import request from '@/utils/requestUtil'

export function memberLogin(data) {
	return request({
		method: 'POST',
		// url: '/api/v1/sso/update',
		// url: '/api/v1/sso/save',
		url: '/api/v1/wechat/sso/login',
		header: {
			'content-type': 'application/json'
		},
		data: data
	})
}

export function memberRegist(data) {
	return request({
		method: 'POST',
		url: '/api/v1/wechat/sso/save',
		header: {
			'content-type': 'application/json'
		},
		data: data
	})
}

export function memberInfo() {
	return request({
		method: 'GET',
		url: '/api/v1/wechat/sso/info'
	})
}
