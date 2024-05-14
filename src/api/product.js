import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/api/v1/product/list',
    method:'get',
    params:params
  })
}

export function fetchSimpleList(params) {
  return request({
    url:'/product/simpleList',
    method:'get',
    params:params
  })
}

export function updateDeleteStatus(params) {
  return request({
    url:'/api/v1/product/update/deleteStatus',
    method:'post',
    params:params
  })
}

export function updateNewStatus(params) {
  return request({
    url:'/product/update/newStatus',
    method:'post',
    params:params
  })
}

export function updateRecommendStatus(params) {
  return request({
    url:'/product/update/recommendStatus',
    method:'post',
    params:params
  })
}

export function updatePublishStatus(params) {
  return request({
    url:'/product/update/publishStatus',
    method:'post',
    params:params
  })
}

export function createProduct(data) {
  return request({
    url:'/api/v1/product/create',
    method:'post',
    data:data
  })
}

export function updateProduct(id,data) {
  return request({
    url:'/api/v1/product/update/'+id,
    method:'post',
    data:data
  })
}

export function getProduct(id) {
  return request({
    url:'/api/v1/product/info/'+id,
    method:'get',
  })
}

