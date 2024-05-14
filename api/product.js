import request from '@/utils/requestUtil'

export function searchProductList(params) {
	return request({
		method: 'GET',
		url: '/product/search',
		params: params
	})
}

export function fetchCategoryTreeList() {
	return request({
		method: 'GET',
		url: '/product/categoryTreeList'
	})
}

export function fetchProductDetail(id) {
	return request({
		method: 'GET',
		url: '/api/v1/wechat/product/detail/'+id
	})
}

export function getGoodListByShopIdAndCategoryId(params) {
	return request({
		methods: 'GET',
		url: '/api/v1/wechat/product/listByShopIdAndCategoryId',
		params
	})
}

export default {
	getGoodListByShopIdAndCategoryId
}
