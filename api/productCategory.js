import request from '@/utils/requestUtil'

export function productCategoryList(params) {
    return request({
        method: 'GET',
        url: '/api/v1/wechat/productCategory/list?parentId=0',
        params: params
    })
}

export function productCategoryListFirst(params) {
    return request({
        method: 'GET',
        url: '/api/v1/wechat/productCategory/list/first',
        params: params
    })
}

export function productCategoryWithChildren(params) {
    return request({
        method: 'GET',
        url: '/api/v1/wechat/productCategory/withChildren',
        params: params
    })
}

export function productCategoryByParentId(params) {
    return request({
        method: 'GET',
        url: '/api/v1/wechat/productCategory/productCategoryByParentId',
        params: params
    })
}

export default {
    productCategoryList,
    productCategoryWithChildren,
    productCategoryListFirst,
    productCategoryByParentId
}
